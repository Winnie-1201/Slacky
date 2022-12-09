from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Group, GroupMessage
from ..forms import DirectMessageForm


dm_routes = Blueprint("messages", __name__)

# Get direct messages
# Return all messages from a group
@dm_routes.route("/<int:id>")
@login_required
def dms_by_groupId(id):
    """
    Query for all the messages from a group and returns 
    them in a list of messages dictionaries
    """
    dms = Group.query.get(id)
    return dms.to_dict()


# Create a message from a group
# Return a new direct message in a group
@dm_routes.route("<int:id>", method=["Post"])
@login_required
def create_dm(id):
    form = DirectMessageForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_message = GroupMessage(
            content=form.data["content"],
            groupId=id,
            userId=current_user.id
        )

        db.session.add(new_message)
        db.session.commit()
        return 
    
    if form.errors:
        return form.errors

    return 

