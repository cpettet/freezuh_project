from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.fields.core import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired
from application.models import Sample


def sample_type_exists(field):
    pass


class SampleForm(FlaskForm):
    plate_id = IntegerField("plate_id")
    box_id = IntegerField("box_id")
    sample_type = StringField("sample_type", validators=[DataRequired()])
    thaw_count = IntegerField("thaw_count")