from flask import Blueprint, request
from sqlalchemy import or_, and_
from app.models import db, Group, User
from app.forms import GroupForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

group_routes = Blueprint('groups', __name__)

@group_routes.route("/current")
@login_required
def current_user_groups():
    groups = Group.query.all()
    user_groups = []
    for group in groups:
        for user in group.group_user_groups:
            if user.id == current_user.id:
                user_groups.append(group)

    return {"groups": [group.to_dict() for group in user_groups]}

@group_routes.route("")
@login_required
def all_groups():
    groups = Group.query.all()
    return {"groups": [group.to_dict() for group in groups]}

@group_routes.route("", methods=["POST"])
@login_required
def add_group():
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        topic = form.data["topic"] if form.data["topic"] else None
        user_ids = form.data["users"]
        group_users = [User.query.get(id) for id in user_ids.split(",")]

        new_group = Group(
            topic=topic,
            group_user_groups=group_users
        )

        receiver = User.query.get(user_ids.split(",")[0])
        sender = User.query.get(user_ids.split(",")[1])

        receiver.user_user_groups.append(new_group)
        sender.user_user_groups.append(new_group)

        # group_users[0].user_user_groups.append(new_group)
        # group_users[1].user_user_groups.append(new_group)
        # db.session.add(group_users[0])
        # db.session.add(group_users[1])
        db.session.add(new_group)
        db.session.commit()
        return new_group.to_dict()

    if form.errors:
        return form.errors
