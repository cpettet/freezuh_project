from . import db
# plate
#   one-to-many table
#   position/well would be enum: positions 1-96
#   STILL keep track of next available position
#       well 1: sample 1
#       well 2: sample 2
#       well 3: empty
#       ...
#       well 96: empty


class Plate(db.Model):
    """
    Required: none
    """
    __tablename__ = "plates"

    id = db.Column(db.Integer, primary_key=True)
    rack_id = db.Column(db.Integer, nullable=True)
    thaw_count = db.Column(db.Integer, default=0, nullable=False)
    store_date = db.Column(db.DateTime, nullable=True)
    discarded = db.Column(db.Boolean, default=False, nullable=False)

    open_well = db.Column(db.Integer, default=1, nullable=False)
    max_well = db.Column(db.Integer, default=96, nullable=False)
    stored = db.Column(db.Boolean, default=False, nullable=False)

    def store_sample_in_well(self):
        """
        After finding the first available space for a sample, stores a sample
        in the space, and moves the next available spot up by one.
        """
        self.open_well += 1

    # Associations
    # rack = db.relationship("Rack", back_populates="plates")
    wells = db.relationship("Well", back_populates="plate",
                            passive_deletes=True,
                            cascade="all,delete-orphan")

    def get_samples(self):
        """
        Gets all samples on the plate that are associated through the wells.
        """
        return [well.sample.to_dict() for well in self.wells]

    def discard_plate(self):
        """
        Sets the plate's discarded value to True. Iterates through all stored
        samples on plate and discards them.
        """
        self.discarded = True
        for well in self.wells:
            sample = well.sample
            sample.discarded = True

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
            "rack_id": self.rack_id,
            "thaw_count": self.thaw_count,
            "store_date": self.store_date,
            "discarded": self.discarded,
            "open_position": self.open_position,
            "max_position": self.max_position,
            "stored": self.stored,
            "samples": self.get_samples(),
        }
