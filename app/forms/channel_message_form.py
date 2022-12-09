from flask_wtf import FlaskForm
from wtforms import TextField, SubmitField
from wtforms.validators import DataRequired
from app.models import channel_message


class ChannelMessageForm(FlaskForm):
    content = TextField('message', validators=[DataRequired()])
    submit = SubmitField('send')
