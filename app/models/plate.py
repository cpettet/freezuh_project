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

        Queries the database and finds all well positions associated to the
        plate.

        If a well position is not specified, takes first available position and
        assigns sample to that position. If a well position IS specified,
        checks if position is open and either stores sample or errors.
        """
        filled_wells = db.session.query(Well.well_position).filter(Well.
                                                                   plate_id ==
                                                                   self.id).\
            all()
        filled_wells = [well[0] for well in filled_wells]
        sample = Sample.query.get(sample_id)

        if well_position is not False:
            # Case: well is specified
            if well_position in filled_wells:
                return {"errors": "Specified well is filled"}
            sample_well = Well(
                well_position=well_position,
                plate_id=self.id,
            )
            self._store_sample(sample, sample_well, sample_id)
        else:
            # Case: no well specified
            next_available_well = filled_wells[-1] + 1 if (len(filled_wells) >=
                                                           1) else 1
            if next_available_well > self.max_well:
                return {"errors": "Given plate has no open wells."}
            sample_well = Well(
                well_position=next_available_well,
                plate_id=self.id,
            )
            self._store_sample(sample, sample_well, sample_id)

    def _store_sample(self, sample, sample_well, sample_id):
        """
        Helper function to store a sample in a given sample well.
        """
        sample.store_date = datetime.now()
        db.session.add(sample_well)
        db.session.flush()
        if sample.well_id is not None:
            old_well = Well.query.get(sample.well_id)
            db.session.delete(old_well)
            db.session.commit()
        sample.well_id = sample_well.id
        db.session.commit()
        return {"success": f"Sample #{sample_id} stored in plate \
                    # {self.id}, well #{sample_well.well_position}"}

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

    def get_samples_wells(self):
        """
        Gets all samples and associated plates.
        """
        return {well.well_position: well.sample.id for well in self.wells}

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
            "max_well": self.max_well,
            "samples": self.get_samples_ids(),
            "samples and wells": self.get_samples_wells(),
        }
