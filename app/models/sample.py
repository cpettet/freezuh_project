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
    sample_type = db.Column(db.Enum(SampleType), nullable=False,
                            default=SampleType.whole_blood)
    accession_date = db.Column(db.DateTime, nullable=False,
                               default=datetime.utcnow)
    store_date = db.Column(db.DateTime, nullable=True)
    thaw_count = db.Column(db.Integer, default=0, nullable=False)
    expiration_date = db.Column(db.DateTime, nullable=False)
    discarded = db.Column(db.Boolean, default=False, nullable=False)
    manifest_url = db.Column(db.String, nullable=True)

    well_id = db.Column(
        db.Integer,
        db.ForeignKey("wells.id"),
        nullable=True,
    )

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

    def get_plate_id(self):
        return self.well.plate_id if self.well else "N/A"

    def get_well_id(self):
        return self.well.well_position if self.well else "N/A"

    def get_sample_position(self) -> tuple:
        """
        Gets the sample position from the plate based on the plate size.
        Assumes that the plate is filled vertically.

        Example: A1 -> (0, 1), H1 -> (1, 0) D2 -> (1, 4), H12 -> (12, 0)
        """
        if self.well:
            well_position = self.well.well_position
            column_number = well_position // 8
            row_number = well_position % 8
            return (column_number, row_number)
        else:
            return "N/A"

    # Associations
    well = db.relationship("Well", back_populates="sample", uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "sample_type": self.sample_type.value,
            "accession_date": self.accession_date,
            "store_date": self.store_date,
            "thaw_count": self.thaw_count,
            "expiration_date": self.expiration_date,
            "discarded": self.discarded,
            "plate_id": self.get_plate_id(),
            "well_id": self.get_well_id(),
            "sample_position": self.get_sample_position(),
            "manifest_url": self.manifest_url,
        }
