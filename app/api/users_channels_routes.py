from flask import Blueprint, request
# from sqlalchemy import or_, and_

from app.models import db, Channel, User, users_channels
from app.forms import UserChannelForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

user_channel_routes = Blueprint('users_channels', __name__)

@user_channel_routes.route('', methods=["POST"])
@login_required
def add_user_channel():
    # print('--------------------- create user channel pair route ---------------------')

    form = UserChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print('****** submitting ******')
        # print(form.data)
        # print('****** submitting ******')
        user_id = form.data['user_id']
        channel_id = form.data['channel_id']

        user = User.query.get(user_id)
        channel = Channel.query.get(channel_id)

        if user in channel.channel_members:
            return {'errors': 'This user is already in this channel.'}   

        channel.channel_members.append(user)

        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
        # return '1'

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_channel_routes.route('', methods=["DELETE"])
@login_required
def delete_user_channel():
    # print('--------------------- delete user channel pair route ---------------------')
    # print('request', dir(request))
    # print(request.data)
    form = UserChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('form.data', form.data)

    if form.validate_on_submit():
        # print('****** submitting ******')
        # print(form.data)
        # print('****** submitting ******')
        user_id = form.data['user_id']
        channel_id = form.data['channel_id']

        user = User.query.get(user_id)
        channel = Channel.query.get(channel_id)

        if user not in channel.channel_members:
            return {'errors': 'This user is not in this channel.'}         

        channel.channel_members.remove(user)

        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
        # return '1'

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401