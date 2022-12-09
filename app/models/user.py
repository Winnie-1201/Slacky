from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


from .channel import user_channels

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashedPassword = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255))
    is_active = db.Column(db.Boolean)
    status = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime)
    updatedAt = db.Column(db.DateTime)

    # channels = db.relationship('channels',back_populates='user',cascade='all,delete')
    channel_messages = db.relationship('ChannelMessage',back_populates='user',cascade='all,delete')
    # groupMessages = db.relationship('groupMessages',back_pupulate ='user',cascade='all,delete')

    channels = db.relationship(
        'Channel', back_populates='organizer', cascade='all, delete')

    user_channels = db.relationship(
        'Channel',
        secondary=user_channels,
        back_populates='channel_members',
        cascade='all, delete'
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
            'imageUrl': self.imageUrl,
            'is_active': self.is_active,
            'status': self.status,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
