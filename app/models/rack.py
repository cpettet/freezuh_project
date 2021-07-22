from datetime import datetime
from . import db
from .rack_position import RackPosition
from .plate import Plate
from app.models import rack_position


class Rack(db.Model):
    __tablename__ = "racks"

    id = db.Column(db.Integer, primary_key=True)
    max_position = db.Column(db.Integer, default=25, nullable=False)
    discarded = db.Column(db.Boolean, default=False, nullable=False)
    freezer_position_id = db.Column(
        db.Integer,
        db.ForeignKey("freezer_positions.id"),
        nullable=True,
        )

    # Associations
    freezer_position = db.relationship("FreezerPosition",
                                       back_populates="rack",
                                       uselist=False)
    rack_positions = db.relationship(
        "RackPosition",
        back_populates="rack",
        passive_deletes=True,
        cascade="all,delete-orphan",
    )

    def get_freezer_id(self):
        return (self.freezer_position.freezer_id if self.freezer_position
                else "N/A")

    def get_freezer_position(self):
        return (self.freezer_position.freezer_position if self.freezer_position
                else "N/A")

    def store_plate_in_position(self, plate_id, rack_position=False):
        """
        After finding the first available position for a rack, stores a rack in
        the position, and moves the next open position up by one.
        """
        filled_positions = (db.session.query(RackPosition.rack_position)
                            .filter(RackPosition.rack_id == self.id).all())
        filled_positions = [position[0] for position in filled_positions]
        plate = Plate.query.get(plate_id)

        if rack_position is not False:
            # Case: rack position is specified
            if rack_position in filled_positions:
                return {"errors": "Specified position is filled"}
            plate_position = RackPosition(
                rack_position=rack_position,
                rack_id=self.id,
            )
            self._store_plate(plate, plate_position, plate_id)
        else:
            # Case: no well specified
            next_available_position = (filled_positions[-1] + 1 if
                                       len(filled_positions) >= 1 else 1)
            if next_available_position > self.max_position:
                return {"errors": "Given rack has no openings."}
            rack_position = RackPosition(
                rack_position=next_available_position,
                rack_id=self.id,
            )
            self._store_plate(plate, rack_position, plate_id)

    def _store_plate(self, plate, rack_position, plate_id):
        "Helper function to store a plate in a given rack position."
        plate.store_date = datetime.now()
        db.session.add(rack_position)
        db.session.flush()
        if plate.rack_position_id is not None:
            old_rack_position = (RackPosition.query.get(
                plate.rack_position_id))
            db.session.delete(old_rack_position)
            db.session.commit()
        plate.rack_position_id = rack_position.id
        db.session.commit()
        return {"success": f"Plate #{plate_id} stored in rack \
                        #{self.id}, position #{rack_position.id}"}

    def get_plates(self):
        """
        Gets all plates on the rack that are associated through the rack
        positions.
        """
        return [rack_position.plate.to_dict() for rack_position
                in self.rack_positions]

    def get_plates_ids(self):
        """
        Gets all plates' ids on the rack that are associated through the rack
        positions.
        """
        return [rack_position.plate.id for rack_position
                in self.rack_positions]

    def get_plates_positions(self):
        return {rack_position.rack_position: rack_position.plate.id for
                rack_position in self.rack_positions}

    def to_dict(self):
        return {
            "id": self.id,
            "freezer_id": self.get_freezer_id(),
            "freezer_position": self.get_freezer_position(),
            "max_position": self.max_position,
            "plates": self.get_plates_ids(),
            "plates_and_positions": self.get_plates_positions(),
            "discarded": self.discarded,
        }
