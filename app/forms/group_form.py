from flask_wtf import FlaskForm
from wtforms import StringField


# def users_exit(form, field):
#     users = field.data
#     if users and users.length > 2:


class GroupForm(FlaskForm):
    topic = StringField("topic")
    # not sure if we need validation on users
    users = StringField("user")
    group_msg = StringField("group_msg")