from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField
from wtforms.validators import NumberRange


class RackForm(FlaskForm):
    freezer_id = IntegerField("freezer_id")
    freezer_position = IntegerField("freezer_position")
    max_position = IntegerField("max_position",
                                validators=[NumberRange(min=None, max=25)])
