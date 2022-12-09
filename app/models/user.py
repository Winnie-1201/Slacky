from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

from .user_group import user_groups
from .channel import user_channels

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255))
    is_active = db.Column(db.Boolean)
    status = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())

    channel_messages = db.relationship('ChannelMessage', back_populates='user',cascade='all, delete')
    group_messages = db.relationship('GroupMessage', back_populates ='user',cascade='all, delete')
    channels = db.relationship('Channel', back_populates='organizer', cascade='all, delete')

    user_channels = db.relationship(
        'Channel',
        secondary=user_channels,
        back_populates='channel_members',
        cascade='all, delete'
    )

    user_user_groups = db.relationship(
        "Group",
        secondary=user_groups,
        back_populates="group_user_groups",
        cascade="all, delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'is_active': self.is_active,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
