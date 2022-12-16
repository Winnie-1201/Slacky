from flask import Blueprint, request
from sqlalchemy import or_, and_
from app.models import db, Group, User, GroupMessage
from app.forms import GroupForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from ..mysocket import socketio


group_routes = Blueprint('groups', __name__)

@group_routes.route("/current")
@login_required
def current_user_groups():
    # print('current user group route')
    current_user_groups = current_user.user_user_groups
    # print(current_user.to_dict())
    # print(current_user_groups)

    # groups = Group.query.all()
    # user_groups = []
    # for group in groups:
    #     for user in group.group_user_groups:
    #         if user.id == current_user.id:
    #             user_groups.append(group)

    # print(user_groups)
# {
#   "groups": [
#     {
#       "group_messages": [
#         {
#           "content": "Hi, I am Demo1",
#           "created_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#           "groupId": 2,
#           "id": 5,
#           "updated_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#           "user": {
#             "created_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#             "email": "demo1@aa.io",
#             "id": 1,
#             "image_url": "https://www.w3schools.com/howto/img_avatar.png",
#             "is_online": true,
#             "status": "Lorem ipsum dolor sit amet",
#             "updated_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#             "username": "Demo1"
#           },
#           "userId": 1
#         },
#         {
#           "content": "Hi, I am Demo3",
#           "created_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#           "groupId": 2,
#           "id": 6,
#           "updated_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#           "user": {
#             "created_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#             "email": "demo3@aa.io",
#             "id": 3,
#             "image_url": "https://www.w3schools.com/howto/img_avatar.png",
#             "is_online": true,
#             "status": "Lorem ipsum dolor sit amet",
#             "updated_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#             "username": "Demo3"
#           },
#           "userId": 3
#         }
#       ],
#       "id": 2,
#       "topic": null,
#       "users": [
#         {
#           "created_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#           "email": "demo1@aa.io",
#           "id": 1,
#           "image_url": "https://www.w3schools.com/howto/img_avatar.png",
#           "is_online": true,
#           "status": "Lorem ipsum dolor sit amet",
#           "updated_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#           "username": "Demo1"
#         },
#         {
#           "created_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#           "email": "demo3@aa.io",
#           "id": 3,
#           "image_url": "https://www.w3schools.com/howto/img_avatar.png",
#           "is_online": true,
#           "status": "Lorem ipsum dolor sit amet",
#           "updated_at": "Fri, 16 Dec 2022 02:26:56 GMT",
#           "username": "Demo3"
#         }
#       ]
#     }
#   ]
# }

    return {"groups": [group.to_dict() for group in current_user_groups]}

@group_routes.route("")
@login_required
def all_groups():
    groups = Group.query.all()
    return {"groups": [group.to_dict() for group in groups]}


@group_routes.route("/<int:groupId>")
@login_required
def one_group(groupId):
    group = Group.query.get(groupId)

    if not group: 
        return {"error:": "Group Not Found"}

    return {'group': group.to_dict()}

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

        # print("new_group", new_group)
        # print("new)gorup to dic", dir(new_group))
        # print("new)gorup to dic", new_group.to_dict())
        # print("-------------")

        # room = new_group.to_dict()['id']
        # socketio.emit('join', room)
        return new_group.to_dict()

    if form.errors:
        return form.errors


@group_routes.route("", methods=["DELETE"])
@login_required
def delete_group():
    db.session.execute("DELETE FROM user_groups")
    db.session.commit()

    return 'success'