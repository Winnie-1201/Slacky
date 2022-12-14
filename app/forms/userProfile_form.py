from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
# from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class UserProfileForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    # email = StringField('email', validators=[DataRequired(), user_exists])
    # password = StringField('password')
    image_url = StringField('image_url')
    is_online = BooleanField('is_online')
    status = StringField('status')
