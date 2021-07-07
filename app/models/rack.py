from datetime import datetime
from . import db
from .rack_position import RackPosition
from .plate import Plate


class Rack(db.Model):
    __tablename__ = "racks"

    id = db.Column(db.Integer, primary_key=True)
    open_position = db.Column(db.Integer, default=1, nullable=False)
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
        return self.freezer_position.freezer_id

    def store_plate_in_position(self, plate_id):
        """
        After finding the first available position for a rack, stores a rack in
        the position, and moves the next open position up by one.
        """
        if self.open_position <= self.max_position:
            rack_position = RackPosition(
                rack_position=self.open_position,
                rack_id=self.id,
            )
            plate = Plate.query.get(plate_id)
            plate.store_date = datetime.now()
            db.session.add(rack_position)
            db.session.flush()
            if plate.rack_position_id is not None:
                old_rack_position = (RackPosition.query.
                                     get(plate.rack_position_id))
                db.session.delete(old_rack_position)
                db.session.commit()
            plate.rack_position_id = rack_position.id
            self.open_position += 1
            db.session.commit()
            return {"success": f"Plate #{plate_id} stored in rack \
                            #{self.id}, position #{self.open_position - 1}"}
        else:
            return {"errors": "Given rack has no open spots"}

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

    def to_dict(self):
        return {
            "id": self.id,
            "freezer_id": self.get_freezer_id(),
            "freezer_position_id": self.freezer_position_id,
            "open_position": self.open_position,
            "max_position": self.max_position,
            "plates": self.get_plates_ids(),
            "discarded": self.discarded,
        }
