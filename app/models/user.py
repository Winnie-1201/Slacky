from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

from .user_group import user_groups
from .channel import users_channels

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255))
    is_online = db.Column(db.Boolean)
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
        secondary=users_channels,
        back_populates='channel_members',
        cascade='all, delete'
    )

    # groups_user = db.relationship("Group", back_populates="user_group", cascade="all, delete")
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

    def user_channels_dict(self, user_channels):
        dict = {}
        for c in user_channels:
            dict[c.id] = c.to_dict_name_only()

        return dict

    def to_dict_basics(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'is_online': self.is_online,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'is_online': self.is_online,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            "organizor_channels": [c.to_dict_name_only() for c in self.channels],
            "user_channels": [c.to_dict_name_only() for c in self.user_channels],
            "user_channels_dict": self.user_channels_dict(self.user_channels),
            "groups": [g.to_dict() for g in self.user_user_groups]
        }
