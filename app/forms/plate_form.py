from flask_wtf import FlaskForm
from wtforms.fields.core import BooleanField, IntegerField, DateTimeField
from wtforms.validators import NumberRange


class PlateForm(FlaskForm):
    rack_id = IntegerField("rack_id")
    thaw_count = IntegerField("thaw_count")
    store_date = DateTimeField("store_date", format="%Y-%m-%dT%H:%M")
    discarded = BooleanField("discarded")
    max_position = IntegerField("max_position",
                                validators=[NumberRange(min=6, max=3456)])
    stored = BooleanField("stored")
