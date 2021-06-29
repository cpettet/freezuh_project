from . import db
from datetime import datetime, timedelta
from enum import Enum


class SampleType(Enum):
    whole_blood = "whole blood"
    plasma = "plasma"
    cf_dna = "cf dna"



class Sample(db.Model):
    __tablename__ = "samples"
    
    id = db.Column(db.Integer, primary_key=True)
    plate_id = db.Column(db.Integer, nullable=True)
    box_id = db.Column(db.Integer, nullable=True)
    sample_type = db.Column(Enum(SampleType), nullable=False,
                            default=SampleType.whole_blood)
    accession_date = db.Column(db.DateTime, nullable=False,
                               default=datetime.utcnow)
    store_date = db.Column(db.DateTime, nullable=True)
    thaw_count = db.Column(db.Integer, default=0)
    expiration_date = db.Column(db.DateTime, nullable=False)
    discarded = db.Column(db.Boolean, default=False)
    
    @property
    def expiry_date(self):
        return self.expiration_date

    @expiry_date.setter
    def expiry_date(self, date_time):
        """
        Updates expiration date based on arbitrary 180-day shelf life. In the 
        future, have a variable expiration date based on sample type.
        """
        date_change = timedelta(days=180)
        self.expiration_date += date_change
    
    # Associations
        # plate association here
        # box association here
    
    def to_dict(self):
        return {
            "id": self.id,
            "plate_id": self.plate_id,
            "box_id": self.box_id,
            "sample_type": self.sample_type,
            "accession_date": self.accession_date,
            "store_date": self.store_date,
            "thaw_count": self.thaw_count,
            "discarded": self.discarded,
        }
