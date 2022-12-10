from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
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


@user_routes.route('<int:id>', methods=["PUT"])
@login_required
def userProfile(id):
    print('userProfile form upadate works')
