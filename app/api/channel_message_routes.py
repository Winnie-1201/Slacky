from flask import Blueprint, request, render_template
from sqlalchemy import or_, and_

from app.models import db, ChannelMessage, User, Channel
from app.forms import ChannelMessageForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

channel_message_routes = Blueprint('channel_messages', __name__)

@channel_message_routes.route('/<int:channel_id>')
@login_required
def get_channel_message(channel_id):
    channel = Channel.query.get(channel_id)
    if current_user in channel.channel_members:
        messages = channel.channel_messages
        return {"channel_messages":[message.to_dict() for message in messages]}
    else: {"Errors": "Only channel member can see the messages"}
    return {"Errors": "The channel could not be found"}, 404


@channel_message_routes.route('/<int:channel_id>', methods=["POST"])
@login_required
def create_channel_message(channel_id):
    channel = Channel.query.get(channel_id)
    if current_user in channel.channel_members:
        form = ChannelMessageForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            new_message = ChannelMessage(user_id=current_user.id, channel=channel, content=form.data["content"])
            db.session.add(new_message)
            db.session.commit()
            return new_message.to_dict()
        if form.errors:
            return form.errors
    else:
        return {"Errors": "Only channel member can send messages"}
    return {"Errors": "The channel could not be found"}, 404

@channel_message_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_channel_message(id):
    # print("------------ route------------", request.data)

    channel_message = ChannelMessage.query.get(id)
    form = ChannelMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("------------ content ----------",form.data)

    if channel_message.user_id==current_user.id:
        if form.validate_on_submit():
            # print("------------ content validated ----------",form.data["content"])
            channel_message.content = form.data["content"]
            db.session.commit()
            return channel_message.to_dict()
        if form.errors:
            return {"Errors":form.errors}
    else:
        return {"Errors": "Only sender can edit the message"}
    return {"Errors": "The channel_message could not be found"}, 404

@channel_message_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_channel_message(id):
    channel_message = ChannelMessage.query.get(id)
    if channel_message.user_id==current_user.id:
        db.session.delete(channel_message)
        db.session.commit()
        return {"Message": "The channel_message was deleted sucessfully!"}, 200
    else:
        return {"Errors": "Only sender can delete the message"}
    return {"Errors": "The channel_message could not be found"}, 404
