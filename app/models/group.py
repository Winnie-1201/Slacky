from .db import db, environment, SCHEMA
from .user_group import user_groups

class Group(db.Model):
    __tablename__ = "groups"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(250))

    group_messages = db.relationship("GroupMessage", back_populates="group", cascade="all, delete")
    # user_group = db.relationship("User", back_populates="groups_user")
    group_user_groups = db.relationship(
        "User",
        secondary=user_groups,
        back_populates="user_user_groups",
        cascade='all, delete'
    )

    def to_dict(self):
        users = []
        for group_user in self.group_user_groups:
            users.append(group_user.to_dict_basics())
        return {
            "id": self.id,
            "users": users,
            "topic": self.topic,
            "group_messages": [group_message.to_dict() for group_message in self.group_messages],
            # "group_user": [group_user.to_dict() for group_user in self.group_user_groups]
        }

    
