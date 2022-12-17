from flask import Blueprint, request
from flask_login import login_required,current_user
from app.models import db,User
from app.forms import UserProfileForm


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_userProfile(id):
    # print('userProfil route works')

    user_profile = User.query.get(id)
    # print("current_user_id",current_user)
    curr = current_user
    # print("+++++++++",curr)
    # print("*******id",id)
    if current_user.id == id:
        form = UserProfileForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
        # user_profile.content = form.data['content']
            user_profile.username = form.data['username'] if form.data['username'] else user_profile.username
            user_profile.password = form.data['password'] if form.data['password'] else user_profile.password
            user_profile.image_url = form.data['image_url'] if form.data["image_url"] else user_profile.image_url
            user_profile.is_online = form.data['is_online'] if form.data['is_online'] else user_profile.is_online
            user_profile.status = form.data['status'] if form.data['status'] else user_profile.status

            db.session.commit()
            # print("-----------------",user_profile)
            return user_profile.to_dict()
        if form.errors:
            return form.errors
    else:
        return {"erro":"current user does not have access"}


# @user_routes.route('/<int:id>/channels')
# @login_required
# def get_user_channels(id):
#     user = User.query.get(id)
#     user_obj = user.to_dict()

#     channels = Channel.query.all()
#     print("channels",channels)
#     for channel in channels:
#         print("channle",channel.organizer_id)
#         print("user_id",user.id)
#         if channel.organizer_id == user.id:
#            user_obj['channels']=channel
#         else:
#             return "The user dose not have channels"
