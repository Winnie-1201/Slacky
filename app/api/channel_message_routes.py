from flask import Blueprint, request, render_template
from sqlalchemy import or_, and_

from app.models import db, ChannelMessage, User, Channel, users_channels
from app.forms import ChannelMessageForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

channel_message_routes = Blueprint('channel_messages', __name__)

@channel_message_routes.route('/<int:channel_id>')
@login_required
def get_channel_message(channel_id):
    channel = Channel.query.get(channel_id)
    print("********************* channel_members",channel.channel_members)
    if current_user in channel.channel_members:
        print("********************* users_channels",users_channels)
        messages = ChannelMessage.query.filter(users_channels.channel_id == channel_id)
        return {"channel_messages":[channel_message for channel_message in channel_messages]}
    # user_channel = user_channels.query.filter(user_channels.user_id == current_user.id).filter(user_channels.channel_id == channel_id)
    # print("****************", user_channel)
    # if user_channel:
    #    messages = ChannelMessage.query.filter(user_channels.channel_id == channel_id)
    #    return {"channel_messages":[channel_message for channel_message in channel_messages]}
    return {"Errors": "Only channel member can see the messages"}
    return "1"

@channel_message_routes.route('/<int:channel_id>', methods=["POST"])
@login_required
def create_channel_message(channel_id):
    channel = Channel.query.get(channel_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user in channel.channel_members:
        form = ChannelMessageForm()
        if form.validate_on_submit():
                new_message = ChannelMessage(user_id=current_user.id, channel=channel, content=form.data["content"])
                db.session.add(new_message)
                db.session.commit()
                return new_message.to_dict()
        if form.errors:
            print(form.errors)
    return {"Errors": "Only channel member can send messages"}

@channel_message_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_channel_message(channel_id):
    channel_message = ChannelMessage.query.get(id)
    form = ChannelMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if channel_message:
        if form.validate_on_submit():
            channel_message.content = form.data["content"]
            db.session.commit()
            return channel_message.to_dict()
        if form.errors:
            print(form.errors)
    return {"Errors": "The channel_message could not be found"}, 404

@channel_message_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_channel_message(id):
    channel_message = ChannelMessage.query.get(id)
    if channel_message:
        db.session.delete(channel_message)
        db.session.commit()
        return {"Message": "The channel_message was deleted sucessfully!"}, 200
    return {"Errors": "The channel_message could not be found"}, 404
