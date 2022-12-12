from flask import Blueprint
from app.models import db, ChannelMessage, GroupMessage, Channel
from flask_login import login_required, current_user


search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:keyword>')
@login_required
def search_message(keyword):
    print("search works++++++++++++")
    all_message = ChannelMessage.query.all()
    print("all_message*********",all_message)
    for channel_message in all_message:
        print("channel_message",channel_message.to_dict())
        for message in channel_message:
            if keyword in message.content:
                print("message",message)
                +" " + message.channel_id
