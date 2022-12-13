from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField, SelectField
# from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel, User


def get_users():
    return [(user.id, user.username) for user in User.query.all()]

def name_exists(form, field):
    # Checking if duplicate channel or username
    # print('&&&&&&&&', form.id, form.id.data, dir(form.id), type(form.id), field)

    name = field.data
    channel = Channel.query.filter(Channel.name == name).first()
    user = User.query.filter(User.username == name).first()

    if channel and channel.id != form.id.data:
        raise ValidationError(
            'That name is already taken by a channel or username.')

    if user:
        raise ValidationError(
            'That name is already taken by a channel or username.')


def description_length(form, field):
    # Checking if description is less than or equal to 250 chars
    description = field.data

    if description and len(description) > 250:
        raise ValidationError("This field can’t be more than 250 characters.")


def topic_length(form, field):
    # Checking if description is less than or equal to 250 chars
    topic = field.data

    if topic and len(topic) > 250:
        raise ValidationError("This field can’t be more than 250 characters.")


def users_exist(form, field):
    user_ids = field.data

    if user_ids:
        for id in user_ids.split(','):
            user = User.query.get(id)
            if not user:
                raise ValidationError('This user does not exists')


class ChannelForm(FlaskForm):
    id = IntegerField('id')
    name = StringField(
        'name', validators=[DataRequired(), name_exists])
    description = StringField('description', validators=[description_length])
    topic = StringField('topic', validators=[topic_length])
    is_public = StringField('is_public')
    users = StringField('users', validators=[users_exist])
