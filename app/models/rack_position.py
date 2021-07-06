from . import db


class RackPosition(db.Model):
    __tablename__ = "rack_positions"

    id = db.Column(db.Integer, primary_key=True)
    rack_position = db.Column(db.Integer, nullable=False)
    rack_id = db.Column(db.Integer,
                        db.ForeignKey("racks.id", ondelete="CASCADE"),
                        nullable=False)

    # Associations
    rack = db.relationship("Rack", back_populates="rack_positions")
    plate = db.relationship("Plate", back_populates="rack_position",
                            # passive_deletes=True,
                            # cascade="all,delete-orphan",
                            uselist=False)
