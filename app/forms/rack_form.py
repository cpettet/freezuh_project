from flask_wtf import FlaskForm
from wtforms import validators
from wtforms.fields.core import IntegerField
from wtforms.validators import NumberRange


class RackForm(FlaskForm):
    freezer_id = IntegerField("freezer_id", min=1)
    max_position = IntegerField("max_position",
                                validators=[NumberRange(min=None, max=25)])
