from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel, User, users_channels


def channel_valid(form, field):
    # checking if channel exists
    channel_id = field.data
    channel = Channel.query.get(channel_id)

    if not channel:
        raise ValidationError('This channel is not found')


def user_valid(form, field):
    # checking if user exists
    user_id = field.data
    user = User.query.get(user_id)

    if not user:
        raise ValidationError('This user does not exists')


class UserChannelForm(FlaskForm):
    channel_id = IntegerField('channel_id', validators=[DataRequired(), channel_valid])
    user_id = IntegerField('user_id', validators=[DataRequired(), user_valid])
