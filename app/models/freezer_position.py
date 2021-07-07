from . import db


class FreezerPosition(db.Model):
    __tablename__ = "freezer_positions"

    id = db.Column(db.Integer, primary_key=True)
    freezer_position = db.Column(db.Integer, nullable=False)
    freezer_id = db.Column(
        db.Integer,
        db.ForeignKey("freezers.id", ondelete="CASCADE"),
        nullable=False
    )

    # Associations
    freezer = db.relationship("Freezer", back_populates="freezer_positions")
    rack = db.relationship(
        "Plate",
        back_populates="freezer_position",
        uselist=False
    )
