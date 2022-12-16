from flask import Blueprint, request
from sqlalchemy import or_, and_

from app.models import db, Channel, User
from app.forms import ChannelForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('')
@login_required
def all_channels():
    params = request.args # [('is_public', 'False')]

    if not len(params):
        channels = Channel.query.all()
        return {'channels': [c.to_dict_name_only() for c in channels]}
    else:
        filters = []
        if params.get('is_public'):
            is_public = params.get('is_public') == "True"
            filters.append(and_(Channel.is_public == is_public))

        keyword = params.get('keyword')
        if params.get('keyword'):
            filters.append(or_(Channel.name.contains(keyword),
            Channel.description.contains(keyword)))

        # print(filters)
        channels = db.session.query(Channel).filter(*filters)

        return {'channels': [c.to_dict_name_only() for c in channels]}


@channel_routes.route('/<int:id>')
@login_required
def one_channel(id):
    channel = Channel.query.get(id)
    if channel:
        return channel.to_dict()

    return {'errors': 'This channel is not found.'}, 404


@channel_routes.route('', methods=["POST"])
@login_required
def add_channel():
    # print('------------------create channel route------------------')

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('--------create channel form--------')
    # print(form.data)

    if form.validate_on_submit():
        # print('****** submitting ******')
        # print(form.data)
        name = form.data['name']
        description = form.data['description'] if form.data['description'] else None
        topic = form.data['topic'] if form.data['topic'] else None
        is_public = form.data['is_public'] == 'True'
        user_ids = form.data['users']
        channel_members = [User.query.get(id) for id in user_ids.split(',')]

        new_channel = Channel(
            name=name,
            description=description,
            topic=topic,
            is_public=is_public,
            organizer=current_user,
            channel_members=channel_members
        )

        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
        # return '1'

    # print("form.erros -----------------", form.errors)
    # {'name': ['That name is already taken by a channel or username.']}
    return {'errors': form.errors}, 401


@channel_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_channel(id):
    # print('****************** create edit route')

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('*********** form created', form)
    # print('*****', form.errors)
    # print('**** on submit', form.validate_on_submit())

    if form.validate_on_submit():
        # print('****** edit submitting ******')
        # print(form.data)

        channel = Channel.query.get(id)
        # if current_user.id != channel.organizer_id:
        #     return {'errors': ['Unauthorized']}

        channel.name = form.data['name']
        channel.description = form.data['description'] if form.data['description'] else None
        channel.topic = form.data['topic'] if form.data['topic'] else None
        # channel.is_public = form.data['is_public'] == 'True'
        # user_ids = form.data['users']
        # channel.channel_members = [User.query.get(id) for id in user_ids.split(',')]

        db.session.commit()
        return channel.to_dict()
        # return '1'
    return {'errors': form.errors}, 401


@channel_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_channel(id):
    # print('create delete route')

    channel = Channel.query.get(id)
    # print('********************', channel)

    if current_user.id != channel.organizer_id:
        return {'errors': ['Unauthorized']}

    if channel:
        db.session.delete(channel)
        db.session.commit()
        return {"message": "Channel successfully deleted."}

    return {'errors': 'This channel is not found.'}, 404
