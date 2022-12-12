from flask import Blueprint, request
from sqlalchemy import or_, and_
from app.models import db, Group, User
from app.forms import GroupForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

group_routes = Blueprint('groups', __name__)

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

        db.session.add(new_group)
        db.session.commit()
        return new_group.to_dict()
    
    if form.errors:
        return form.errors
