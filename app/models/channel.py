from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

users_channels = db.Table(
    'users_channels',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id'), ondelete='cascade'), primary_key=True),
    db.Column('channel_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('channels.id'), ondelete='cascade'), primary_key=True)
)

if environment == "production":
    users_channels.schema = SCHEMA


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(80), nullable=False, unique=True)
    description = db.Column(db.String(250))
    topic = db.Column(db.String(250))
    is_public = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())

    organizer = db.relationship('User', back_populates='channels')
    
    channel_messages = db.relationship(
        'ChannelMessage', back_populates='channel', cascade="all, delete")

    channel_members = db.relationship(
        'User',
        secondary=users_channels,
        back_populates='user_channels'
    )

    def sort_by_name(self):
        arr = [user.to_dict_basics() for user in self.channel_members]
        sortedArr = sorted(arr, key=lambda user: user['username'].lower())
        return sortedArr

    def member_ids(self):
        arr = [member.id for member in self.channel_members]
        return arr

    def non_member_ids(self):
        arr = []
        return arr

    def to_dict_name_only(self):
        return {
            'id': self.id,
            'organizer_id': self.organizer_id,
            'name': self.name,
            'description': self.description,
            'topic': self.topic,
            'is_public': self.is_public,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'number_of_members': len(self.channel_members),
            'channel_members': self.sort_by_name(),
            'channel_members_ids': self.member_ids(),
            'organizer': self.organizer.to_dict_basics()
        }

    def to_dict(self):
        return {
            'id': self.id,
            'organizer_id': self.organizer_id,
            'name': self.name,
            'description': self.description,
            'topic': self.topic,
            'is_public': self.is_public,
            'organizer': self.organizer.to_dict(),
            'channel_members': self.sort_by_name(),
            'channel_members_ids': self.member_ids(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
