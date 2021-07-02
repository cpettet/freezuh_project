from flask_wtf import FlaskForm
from wtforms.fields.core import (BooleanField, StringField, IntegerField,
                                 DateTimeField)
from wtforms.validators import DataRequired, ValidationError
from app.models.sample import SampleType


def sample_type_exists(form, field):
    """
    Checks if the given sample_type is in the list of valid sample_types 
    presented in the model.
    """
    sample_type = field.data
    valid_sample_types = [enumerated.value for enumerated in list(SampleType)]
    if sample_type not in valid_sample_types:
        raise ValidationError("Sample type is invalid.")


class SampleForm(FlaskForm):
    plate_id = IntegerField("plate_id")
    box_id = IntegerField("box_id")
    sample_type = StringField("sample_type", validators=[
                              DataRequired(), sample_type_exists])
    accession_date = DateTimeField("accession_date", format="%Y-%m-%dT%H:%M")
    store_date = DateTimeField("store_date", format="%Y-%m-%dT%H:%M")
    thaw_count = IntegerField("thaw_count")
    expiry_date = DateTimeField("expiry_date", format="%Y-%m-%dT%H:%M")
    discarded = BooleanField("discarded")
