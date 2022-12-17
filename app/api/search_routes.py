from flask import Blueprint
from app.models import db, Channel, Group, ChannelMessage, GroupMessage
from flask_login import login_required, current_user

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:keyword>')

@login_required
def search_channel_message(keyword):
    # print("search works++++++++++++")
    # channel=Channel.query.filter(current_user in Channel.channel_members).all()
    # print("+++++++++++++++++",channel)
    def filter_members(user):
        return True if user in channel.channel_members else False

    all_channels = Channel.query.all()
    # all_channels_cur = filter(filter_members(current_user,channel.channel_members))

    all_groups = Group.query.all()
    # print("all_groups*********",all_channels)
    # print("all_channels*********",all_channels)
    result_channel =[]
    result_group =[]
    obj_channel = {}
    obj_group ={}
    for channel in all_channels:
        if current_user in channel.channel_members:
        # channel_cur = filter(filter_members(current_user),channel.channel_members)
        # channel_cur = channel.query.filter(current_user in channel.channel_members)

        # print('++++++++++++++',channel_cur)
            # for channel_el in channel:
            arr_channels = []
            channel_messages = channel.channel_messages
                # print("________________________")
                # print("channel_messages",channel_messages)
                # print("________________________")
            for message in channel_messages:
                # print("message____",message)

                if keyword.lower() in message.content.lower():
                    # print("message_content",message.content)
                    arr_channels.append(message.to_dict_basics())
            if (arr_channels):
                obj_channel["channelId"+ " " + str(channel.id)] = arr_channels

    result_channel.append(obj_channel)


    for group in all_groups:
        if current_user in group.group_user_groups:
            arr_groups = []

            group_msg = group.group_messages
        # print("group_message^^^^^^",group_msg)
            for msg in group_msg:
                if keyword.lower() in msg.content.lower():
                    arr_groups.append(msg.to_dict_basics())
                # print("arr+++++++++",len(arr_groups))
            if (arr_groups):
                obj_group["groupId"+ " " + str(group.id)] = arr_groups
                # print("obj_group++++++++++++++",obj_group)
    result_group.append(obj_group)

    return {"Channel_Message":result_channel,"Group_Message":result_group}
