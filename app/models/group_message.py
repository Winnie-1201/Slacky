from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
# from .user import User

class GroupMessage(db.Model):
    __tablename__ = "group_messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())


    groupId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    group = db.relationship("Group", back_populates="group_messages")
    user = db.relationship("User", back_populates="group_messages")

    def to_dict(self):
        # user = User.query.get(self.userId)
        return {
            "id": self.id,
            "content": self.content,
            "groupId": self.groupId,
            "userId": self.userId,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            "user": self.user.to_dict_basics()
            # "user": self.user.to_dict(),
            # "group": self.group.to_dict()
        }

    def to_dict_basics(self):
        return {
            "id": self.id,
            "content": self.content,
            "groupId": self.groupId,
            "userId": self.userId,
            'user_name':self.user.username,
            'user_img':self.user.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,

        }
