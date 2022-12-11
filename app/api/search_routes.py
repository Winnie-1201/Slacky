from flask import Blueprint
from app.models import db, ChannelMessage, GroupMessage
from flask_login import login_required, current_user


search_routes = Blueprint('search', __name__)

@search_routes.route('/keyword')
@login_required
def search_message(keyword):
    print("search works++++++++++++")
    all_message = ChannelMessage.query.all()
    print("all_message*********",all_message)
    for channel_message in all_message:
        print("all_message",channel_message)
        for message in channel_message:
            if keyword in message.content:
                print("message",message)
                # +" " + message.channel_id
