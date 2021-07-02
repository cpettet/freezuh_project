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

    # self.sample.plate_id => plate => plate.samples => # of samples =>
    #   # + 1 => next available => if # + 1 < 96 => add to plate

    # Associations
    plate = db.relationship("Plate", back_populates="wells")
    sample = db.relationship("Sample", back_populates="well",
                             passive_deletes=True, cascade="all,delete-orphan")
