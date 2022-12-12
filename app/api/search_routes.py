from flask import Blueprint
from app.models import db, Channel, Group, ChannelMessage, GroupMessage
from flask_login import login_required, current_user

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:keyword>')

# @login_required
def search_channel_message(keyword):
    # print("search works++++++++++++")
    all_channels = Channel.query.all()
    all_groups = Group.query.all()
    # print("all_channels*********",all_channels)
    result_channel =[]
    result_group =[]
    obj_channel = {}
    obj_group ={}
    for channel in all_channels:
        arr = []
        channel_messages = channel.channel_messages
        print("________________________")
        print("channel_messages",channel_messages)
        print("________________________")
        for message in channel_messages:
            print("message____",message)

            if keyword.lower() in message.content.lower():
                print("message_content",message.content)
                arr.append(message.to_dict())
            obj_channel["channelId"+ " " + str(channel.id)] = arr

    result_channel.append(obj_channel)


    for group in all_groups:
        arr = []
        group_msg = group.group_messages
        for msg in group_msg:
            if keyword.lower() in msg.content.lower():
                arr.append(msg.to_dict())
            obj_group["groupId"+ " " + str(group.id)] = arr
    result_group.append(obj_group)

    return {"Channel Message":result_channel,"Group Message":result_group}

