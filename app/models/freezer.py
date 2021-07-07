from . import db
from .freezer_position import FreezerPosition
from .rack import Rack


class Freezer(db.Model):
    __tablename__ = "freezers"

    id = db.Column(db.Integer, primary_key=True)
    open_position = db.Column(db.Integer, default=1, nullable=False)
    max_position = db.Column(db.Integer, default=25, nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)

    # Associations
    freezer_positions = db.relationship(
        "FreezerPosition",
        back_populates="freezer",
        passive_deletes=True,
        cascade="all,delete-orphan",
    )

    def store_rack_in_position(self, rack_id):
        """
        Finds the next available position in freezer if available and stores
        a rack in this position.
        """
        if self.open_position <= self.max_position:
            freezer_position = FreezerPosition(
                freezer_position=self.open_position,
                freezer_id=self.id,
            )
            rack = Rack.query.get(rack_id)
            db.session.add(freezer_position)
            db.session.flush()
            if rack.freezer_position_id is not None:
                old_freezer_position = (FreezerPosition.query.get(
                    rack.freezer_position_id))
                db.session.delete(old_freezer_position)
                db.session.commit()
            rack.freezer_position_id = freezer_position.id
            self.open_position += 1
            db.session.commit()
            return {"success": f"Plate #{rack_id} stored in rack \
                            #{self.id}, position #{self.open_position - 1}"}
        else:
            return {"errors": "Given freezer has no open spots"}

    def get_racks(self):
        return [freezer_position.rack.to_dict() for freezer_position
                in self.freezer_positions]

    def get_racks_ids(self):
        return [freezer_position.rack.id for freezer_position
                in self.freezer_positions]

    def to_dict(self):
        return {
            "id": self.id,
            "open_position": self.open_position,
            "max_position": self.max_position,
            "racks": self.get_racks_ids(),
            "active": self.active,
        }
