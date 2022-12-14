from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired
from app.models import channel_message

# def get_content(form, field):
    # print("--------form -------",dir(form))
    # print("--------form data -------",form.data)
    # print("--------form content -------",form.content)
    # print("--------field -------",field)


class ChannelMessageForm(FlaskForm):
    content = TextAreaField('message', validators=[DataRequired()])
