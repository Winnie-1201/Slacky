from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired
from app.models import channel_message


class ChannelMessageForm(FlaskForm):
    content = TextAreaField('message', validators=[DataRequired()])
    submit = SubmitField('send')
