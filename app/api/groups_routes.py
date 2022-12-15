from flask import Blueprint, request
from sqlalchemy import or_, and_
from app.models import db, Group, User, GroupMessage
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

        print("form data", form.data)
        print("-------")
        print("-------")
        # group_message = form.data["group_msg"]

        # print("group-message", group_message)

        new_group = Group(
            topic=topic,
            group_user_groups=group_users
        )

        # new_msg = GroupMessage(
        #     content=group_message,
        #     groupId=new_group.id,
        #     userId=current_user.id
        # )
        # new_group.group_messages = [group_message]
        # print("-------")
        # print("-------")
        # print("new group in backend", new_group)
        # print("-------")
        # print("-------")
        # print("-------")

        # new_message = GroupMessage

        # receiver = User.query.get(user_ids.split(",")[0])
        # sender = User.query.get(user_ids.split(",")[1])

        # receiver.user_user_groups.append(new_group)
        # sender.user_user_groups.append(new_group)

        db.session.add(new_group)
        db.session.commit()
        # groups = Group.query.all()
        # group = groups[len(groups)-1]

        # print('-----------')
        # print('-----------')
        # print("user with group len before", len(group_users[0].user_user_groups))
        # print('-----------')
        # print('-----------')
        # group_users[0].user_user_groups.append(group)
        # group_users[1].user_user_groups.append(group)
        # db.session.add(group_users[0])
        # db.session.add(group_users[1])
        # db.session.commit()

        # user_with_group1 = User.query.get(group_users[0].id)
        # user_with_group2 = User.query.get(group_users[1].id)

        # print('-----------')
        # print('-----------')
        # print("user with group len", len(user_with_group1.user_user_groups))
        # print('-----------')
        # print('-----------')

        # db.session.add(group_users[0])
        # db.session.add(group_users[1])
        # db.session.add(new_msg)
        
        return new_group.to_dict()

    if form.errors:
        return form.errors
