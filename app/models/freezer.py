from . import db
from .freezer_position import FreezerPosition
from .rack import Rack


class Freezer(db.Model):
    __tablename__ = "freezers"

    id = db.Column(db.Integer, primary_key=True)
    max_position = db.Column(db.Integer, default=25, nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)

    # Associations
    freezer_positions = db.relationship(
        "FreezerPosition",
        back_populates="freezer",
        passive_deletes=True,
        cascade="all,delete-orphan",
    )

    def store_rack_in_position(self, rack_id, freezer_position=False):
        """
        Finds the next available position in freezer if available and stores
        a rack in this position.
        """
        filled_positions = (db.session.query(FreezerPosition.freezer_position)
                            .filter(FreezerPosition.freezer_id
                                    == self.id).all())
        filled_positions = [position[0] for position in filled_positions]
        print("\n\nFilled positions:", filled_positions)
        print("Desired position:", freezer_position)
        print("cast boolean:", int(freezer_position) in filled_positions)
        print("current boolean:", freezer_position in filled_positions)
        rack = Rack.query.get(rack_id)

        if freezer_position is not False:
            # Case: rack position is specified
            if int(freezer_position) in filled_positions:
                return {"errors": "Specified position is filled."}
            freezer_position = FreezerPosition(
                freezer_position=freezer_position,
                freezer_id=self.id,
            )
            return self._store_rack(rack, freezer_position, rack_id)
        else:
            # Case: no rack position specified
            next_available_position = (filled_positions[-1] + 1 if
                                       len(filled_positions) >= 1 else 1)
            if next_available_position > self.max_position:
                return {"errors": "Given freezer has no openings."}
            freezer_position = FreezerPosition(
                freezer_position=next_available_position,
                freezer_id=self.id,
            )
            return self._store_rack(rack, freezer_position, rack_id)

    def _store_rack(self, rack, freezer_position, rack_id):
        "Helper function to store a plate in a given rack position."
        db.session.add(freezer_position)
        db.session.flush()
        if rack.freezer_position_id is not None:
            old_freezer_position = (FreezerPosition.query.get(
                rack.freezer_position_id))
            db.session.delete(old_freezer_position)
            db.session.commit()
        rack.freezer_position_id = freezer_position.id
        db.session.commit()
        return {"success": f"Rack #{rack_id} stored in rack \
                        #{self.id}, position #{freezer_position.id}"}

    def get_racks(self):
        return [freezer_position.rack.to_dict() for freezer_position
                in self.freezer_positions]

    def get_racks_ids(self):
        return [freezer_position.rack.id for freezer_position
                in self.freezer_positions]

    def get_racks_positions(self):
        return {freezer_position.freezer_position: freezer_position.rack.id for
                freezer_position in self.freezer_positions}

    def to_dict(self):
        return {
            "id": self.id,
            "max_position": self.max_position,
            "racks": self.get_racks_ids(),
            "racks_and_positions": self.get_racks_positions(),
            "active": self.active,
        }
