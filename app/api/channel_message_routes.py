from flask import Blueprint, request, render
from sqlalchemy import or_, and_

from app.models import db, ChannelMessage, User, Channel, user_channels
from app.forms import ChannelMessageForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

channel_message_routes = Blueprint('channel_messages', __name__)

@channel_message_routes.route('/<int:channel_id>')
@login_required
@current_user
def get_channel_message(channel_id):
    channel = Channel.query.get(channel_id)
    if current_user in channel.channel_members:
        print(channel.channnel_members)
    user_channel = user_channels.query.filter(user_channels.user_id == current_user.id).filter(user_channels.channel_id == channel_id)
        print("****************", user_channel)
    if user_channel:
       messages = ChannelMessage.query.filter(user_channels.channel_id == channel_id)
       return {"channel_messages":[channel_message for channel_message in channel_messages]}
    return {"errors": "channel not found"}
