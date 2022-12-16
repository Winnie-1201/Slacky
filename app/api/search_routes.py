from flask import Blueprint
from app.models import db, Channel, Group, ChannelMessage, GroupMessage
from flask_login import login_required, current_user

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:keyword>')

@login_required
def search_channel_message(keyword):
    # print("search works++++++++++++")
    all_channels = Channel.query.all()
    all_groups = Group.query.all()
    # print("all_groups*********",all_groups)
    # print("all_channels*********",all_channels)
    result_channel =[]
    result_group =[]
    obj_channel = {}
    obj_group ={}
    for channel in all_channels:
        arr_cahnnels = []
        channel_messages = channel.channel_messages
        # print("________________________")
        # print("channel_messages",channel_messages)
        # print("________________________")
        for message in channel_messages:
            # print("message____",message)

            if keyword.lower() in message.content.lower():
                # print("message_content",message.content)
                arr_cahnnels.append(message.to_dict_basics())
                obj_channel["channelId"+ " " + str(channel.id)] = arr_cahnnels

    result_channel.append(obj_channel)


    for group in all_groups:
        arr_groups = []

        group_msg = group.group_messages
        # print("group_message^^^^^^",group_msg)
        for msg in group_msg:
            if keyword.lower() in msg.content.lower():
                arr_groups.append(msg.to_dict_basics())
                # print("arr+++++++++",len(arr_groups))
                obj_group["groupId"+ " " + str(group.id)] = arr_groups
                # print("obj_group++++++++++++++",obj_group)
    result_group.append(obj_group)

    return {"Channel_Message":result_channel,"Group_Message":result_group}
