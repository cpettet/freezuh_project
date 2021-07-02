from . import db
# plate
#   one-to-many table
#       position 1: sample 1
#       position 2: sample 2
#       position 3: empty
#       ...
#       position 96: empty


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

    open_position = db.Column(db.Integer, default=1, nullable=False)
    max_position = db.Column(db.Integer, default=96, nullable=False)
    stored = db.Column(db.Boolean, default=False, nullable=False)

    def store_sample_in_well(self):
        """
        After finding the first available space for a sample, stores a sample
        in the space, and moves the next available spot up by one.
        """
        if self.open_position <= self.max_position:
            self.open_position += 1
            return {
                "status": True,
                "message": 
                    f"Successfully stored sample in {self.open_position - 1}",
                }
        else:
            return {"status": False, "error": "No open positions."}

    # Associations
        # rack associations here mto
        # rack = db.relationship("Rack", back_populates="plates")
    samples = db.relationship("Sample", back_populates="plate",
                              passive_deletes=True,
                              cascade="all,delete-orphan")

    def get_samples(self):
        return [sample.to_dict() for sample in self.samples]

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
