from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField
from wtforms.validators import NumberRange


class FreezerForm(FlaskForm):
    max_position = IntegerField("max_position",
                                validators=[NumberRange(min=None, max=25)])
