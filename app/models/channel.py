from .db import db, environment, SCHEMA
from sqlalchemy.sql import func


users_channels = db.Table(
    'users_channels',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id', ondelete='cascade'), primary_key=True),
    db.Column('channel_id', db.Integer, db.ForeignKey(
        'channels.id', ondelete='cascade'), primary_key=True)
)

if environment == "production":
    users_channels.schema = SCHEMA


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
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
        back_populates='user_channels',
        cascade='all, delete'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'organizer_id': self.organizer_id,
            'name': self.name,
            'description': self.description,
            'topic': self.topic,
            'is_public': self.is_public,
            'organizer': self.organizer.to_dict(),
            'channel_members': [user.to_dict() for user in self.channel_members],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
