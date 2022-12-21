from flask import Blueprint
from app.models import db, ChannelMessage, GroupMessage


search_routes = Blueprint('search', __name__)

@search_routes.routes('/<keyword>')
def search_message(keywords):
    message = ChannelMessage.query.filter()
