from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Group, GroupMessage
from ..forms import DirectMessageForm


dm_routes = Blueprint("messages", __name__)

# Get direct messages
# Return all messages from a group
@dm_routes.route("/<int:group_id>")
@login_required
def dms_by_groupId(group_id):
    """
    Query for all the messages from a group and returns
    them in a list of messages dictionaries
    """
    group = Group.query.get(group_id)
    if not group: return {"error": "The group is not found"}
    if current_user in group.group_user_groups:
        dms = group.group_messages
        return {"group_messages": [dm.to_dict() for dm in dms]}
    else:
        return {"error": "The current user does not have access to the group"}


# Create a message from a group
# Return a new direct message in a group
@dm_routes.route("<int:group_id>", methods=["POST"])
@login_required
def create_dm(group_id):
    group = Group.query.get(group_id)
    if not group: return {"error": "The group is not found"}
    if current_user in group.group_user_groups:
        form = DirectMessageForm()
        # Get the csrf_token from the request cookie and put it into the
        # form manually to validate_on_submit can be used
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            new_message = GroupMessage(
                content=form.data["content"],
                groupId=group_id,
                userId=current_user.id
            )
            # print("------------")
            # print("------------")
            # # print("------new msg in backend", new_message)
            # # print("---------group ", group)
            # print("------------group.group_msgs before", group.group_messages)
            # print("------------")
            # print("------------")

            # if group.group_messages:
            #     group.group_messages.append(new_message)
            # else:
            #     group.group_messages = [new_message]
            db.session.add(new_message)
            db.session.commit()
            return {"direct_message": new_message.to_dict()}

        if form.errors:
            return form.errors
    else:
        return {"error": "The current user does not have access to the group"}


# Update the edited message from a group by the message sender
# Return the updated direct message
@dm_routes.route('/<int:group_id>/<int:id>', methods=["PUT"])
def edit_dm(group_id, id):
    group_message = GroupMessage.query.get(id)
    group = Group.query.get(group_id)
    if group and group_message:
        form = DirectMessageForm()
        # Get the csrf_token from the request cookie and put it into the
        # form manually to validate_on_submit can be used
        form['csrf_token'].data = request.cookies['csrf_token']
        if group_message.userId == current_user.id:
            if form.validate_on_submit():
                group_message.content = form.data['content']
                # new_message = GroupMessage(
                #     content=form.data["content"],
                #     groupId=id,
                #     userId=current_user.id
                # )
                # db.session.add(group_message)
                db.session.commit()
                return {"direct_message": group_message.to_dict()}

            if form.errors:
                return form.errors
        else:
            return {"error": "The current user does not have access to the group"}


# Delete a direct message from a group by the message sender
# Return a message to indicate delete successfully
@dm_routes.route("/<int:group_id>/<int:id>", methods=["DELETE"])
def delete_dm(group_id, id):
    group_message = GroupMessage.query.get(id)
    group = Group.query.get(group_id)
    if group and group_message:
        if group_message.userId == current_user.id:
            db.session.delete(group_message)
            db.session.commit()
            return {'message': 'The group message has been deleted successfully.'}
        else:
            return {'error': 'The current user does not have access'}

    else: return {'error': 'The group or the message is not found.'}


@dm_routes.route('/<string:keyword>')
@login_required
def search_dm_message(keyword):
    all_groups = Group.query.all()
    for group in all_groups:
        dm_messages = group.group_messages
