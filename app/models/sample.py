from . import db
from datetime import datetime, timedelta
from enum import Enum


class SampleType(Enum):
    whole_blood = "whole_blood"
    plasma = "plasma"
    cf_dna = "cf_dna"


class Sample(db.Model):
    """
    Required: sample_type
    """
    __tablename__ = "samples"

    id = db.Column(db.Integer, primary_key=True)
    plate_id = db.Column(db.Integer,
                         db.ForeignKey("plates.id", ondelete="CASCADE"),
                         nullable=True)
    box_id = db.Column(db.Integer, nullable=True)
    sample_type = db.Column(db.Enum(SampleType), nullable=False,
                            default=SampleType.whole_blood)
    accession_date = db.Column(db.DateTime, nullable=False,
                               default=datetime.utcnow)
    store_date = db.Column(db.DateTime, nullable=True)
    thaw_count = db.Column(db.Integer, default=0, nullable=False)
    expiration_date = db.Column(db.DateTime, nullable=False)
    discarded = db.Column(db.Boolean, default=False, nullable=False)

    @property
    def expiry_date(self):
        return self.expiration_date

    @expiry_date.setter
    def expiry_date(self, date_time):
        """
        Updates expiration date based on arbitrary 180-day shelf life. In the 
        future, have a variable expiration date based on sample type.
        """
        if date_time is None:
            date_time = datetime.now()
        date_change = timedelta(days=180)
        self.expiration_date = date_time + date_change

    # Associations
    plate = db.relationship("Plate", back_populates="samples")
    # box association here

    def to_dict(self):
        return {
            "id": self.id,
            "plate_id": self.plate_id,
            "box_id": self.box_id,
            "sample_type": self.sample_type.value,
            "accession_date": self.accession_date,
            "store_date": self.store_date,
            "thaw_count": self.thaw_count,
            "expiration_date": self.expiration_date,
            "discarded": self.discarded,
        }
