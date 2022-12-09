from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class channelMessage(db.Model):
    __tablename__ = 'channel_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    channel_id = db.Column(db.Integer,db.ForeignKey("channels.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'content': self.content,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
