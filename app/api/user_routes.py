from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db,User,Channel
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
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('<int:id>', methods=["PUT"])
@login_required
def edit_userProfile(id):
    print('userProfil route works')

    user_profile = User.query.get(id)
    # print('user_profile',user_profile)
    form = UserProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # user_profile.content = form.data['content']
        user_profile.username = form.data['username'],
        user_profile.email = form.data['email'],
        user_profile.password = form.data['password'],
        user_profile.image_url = form.data['image_url'],
        user_profile.is_active = form.data['is_active'],
        user_profile.status = form.data['status']

        db.session.commit()
        return user_profile
    if form.errors:
       return form.errors


@user_routes.route('/<int:id>/channels')
@login_required
def get_user_channels(id):
    user = User.query.get(id)
    user_obj = user.to_dict()

    channels = Channel.query.all()
    print("channels",channels)
    for channel in channels:
        print("channle",channel.organizer_id)
        print("user_id",user.id)
        if channel.organizer_id == user.id:
           user_obj['channels']=channel
        else:
            return "The user dose not have channels"
