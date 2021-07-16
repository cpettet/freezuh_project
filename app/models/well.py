from . import db


class Well(db.Model):
    """
    Technically a "joins" table between plate and sample.
    """
    __tablename__ = "wells"

    id = db.Column(db.Integer, primary_key=True)
    well_position = db.Column(db.Integer, nullable=False)
    plate_id = db.Column(db.Integer,
                         db.ForeignKey("plates.id", ondelete="CASCADE"),
                         nullable=False
                         )

    # Associations
    plate = db.relationship("Plate", back_populates="wells")
    sample = db.relationship(
        "Sample",
        back_populates="well",
        uselist=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "well_position": self.well_position,
            "plate_id": self.plate_id,
            "plate": self.plate,
            "sample": self.sample,
        }
