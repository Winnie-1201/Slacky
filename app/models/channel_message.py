from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    channel_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())

    user = db.relationship('User', back_populates="channel_messages")
    channel = db.relationship('Channel', back_populates="channel_messages")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict()
        }

    def to_dict_basics(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name':self.user.username,
            'user_img':self.user.image_url,
            'channel_id': self.channel_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'channel_name':self.channel.name
        }
