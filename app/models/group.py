from .db import db, environment, SCHEMA
from .user_group import user_groups

class Group(db.Model):
    __tablename__ = "groups"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(250))

    # user_group = db.relationship("User", back_populates="groups_user")
    group_user_groups = db.relationship(
        "User",
        secondary=user_groups,
        back_populates="user_user_groups",
        cascade='all, delete'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "topic": self.topic
        }