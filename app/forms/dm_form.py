from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class DirectMessageForm(FlaskForm):
    content = StringField("content", validators=[DataRequired()])
    sumbit = SubmitField("send")
    # groupId = IntegerField("groupId", validators=[DataRequired()])
    # userId = IntegerField("userId", validators=[DataRequired()])