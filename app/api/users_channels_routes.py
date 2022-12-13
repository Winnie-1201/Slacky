from flask import Blueprint, request
from sqlalchemy import or_, and_

from app.models import db, Channel, User
from app.forms import ChannelForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

user_channel_routes = Blueprint('users_channels', __name__)

@channel_routes.route('')
def add_user_channel():
    pass