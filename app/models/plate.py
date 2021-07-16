from . import db
from .well import Well
from .sample import Sample
from datetime import datetime


class Plate(db.Model):
    """
    Required: none
    """
    __tablename__ = "plates"

    id = db.Column(db.Integer, primary_key=True)
    thaw_count = db.Column(db.Integer, default=0, nullable=False)
    store_date = db.Column(db.DateTime, nullable=True)
    discarded = db.Column(db.Boolean, default=False, nullable=False)
    open_well = db.Column(db.Integer, default=1, nullable=False)
    max_well = db.Column(db.Integer, default=96, nullable=False)
    rack_position_id = db.Column(db.Integer,
                                 db.ForeignKey(
                                     "rack_positions.id",
                                 ),
                                 nullable=True,
                                 )

    # Associations
    rack_position = db.relationship("RackPosition",
                                    back_populates="plate",
                                    uselist=False)
    wells = db.relationship(
        "Well",
        back_populates="plate",
        passive_deletes=True,
        cascade="all,delete-orphan",
    )

    def get_rack_id(self):
        return self.rack_position.rack_id if self.rack_position else "N/A"

    def get_rack_position(self):
        return (self.rack_position.rack_position if self.rack_position
                else "N/A")

    def store_sample_in_well(self, sample_id, well_position=False):
        """
        After finding the first available space for a sample, stores a sample
        in the space, and moves the next available spot up by one.
        """
        if self.open_well <= self.max_well:
            sample_well = Well(
                well_position=self.open_well if not well_position else (
                    well_position),
                plate_id=self.id,
            )
            sample = Sample.query.get(sample_id)
            sample.store_date = datetime.now()
            db.session.add(sample_well)
            db.session.flush()
            if sample.well_id is not None:
                old_well = Well.query.get(sample.well_id)
                db.session.delete(old_well)
                db.session.commit()
            sample.well_id = sample_well.id
            self.open_well += 1
            db.session.commit()
            return {"success": f"Sample #{sample_id} stored in plate \
                            #{self.id}, well #{self.open_well - 1}"}
        else:
            return {"errors": "Given plate has no open spots"}

    def get_samples(self):
        """
        Gets all samples on the plate that are associated through the wells.
        """
        return [well.sample.to_dict() for well in self.wells]

    def get_samples_ids(self):
        """
        Gets all samples on the plate that are associated through the wells.
        """
        return [well.sample.id for well in self.wells]

    def discard_plate(self):
        """
        Sets the plate's discarded value to True. Iterates through all stored
        samples on plate and discards them.
        """
        self.discarded = True
        for well in self.wells:
            sample = well.sample
            sample.discarded = True
        if self.rack_position_id:
            db.session.delete(self.rack_position)
        db.session.commit()

    def thaw_plate(self):
        """
        Thaws the current plate and increments the thaw_count. For each sample
        stored in the plate, increment its thaw count.
        """
        self.thaw_count += 1
        for well in self.wells:
            sample = well.sample
            sample.thaw_count += 1

    def to_dict(self):
        return {
            "id": self.id,
            "rack_id": self.get_rack_id(),
            "rack_position": self.get_rack_position(),
            "thaw_count": self.thaw_count,
            "store_date": self.store_date,
            "discarded": self.discarded,
            "open_position": self.open_well,
            "max_well": self.max_well,
            "samples": self.get_samples_ids(),
        }
