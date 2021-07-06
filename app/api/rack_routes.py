from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Rack
from app.forms import RackForm

rack_routes = Blueprint("racks", __name__)


# GET /api/racks/
@rack_routes.route("/", methods=["GET"])
@login_required
def get_racks():
    racks = Rack.query.all()
    return {"racks": [rack.to_dict() for rack in racks]}


# POST /api/racks/
@rack_routes.route("/", methods=["POST"])
@login_required
def new_rack():
    form = RackForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        rack = Rack(
            max_position=form.data["max_position"],
        )
        db.session.add(rack)
        db.session.commit()
        # TODO: come back for freezer_id
    if form.errors:
        return {"errors": form.errors}
    return {"rack": rack.to_dict()}


# PATCH /api/racks/:id/
@rack_routes.route("/<int:rack_id>", methods=["PATCH"])
@login_required
def edit_rack(rack_id):
    rack = Rack.query.get(rack_id)
    request_body = request.get_json()

    # TODO: come back for freezer_id
    # PATCH into the database
    rack.max_position = request_body["max_position"]
    db.session.commit()
    return {"rack": rack.to_dict()}


# DELETE /api/racks/:id/
@rack_routes.route("/<int:rack_id>", methods=["DELETE"])
@login_required
def delete_rack(rack_id):
    rack = Rack.query.get(rack_id)
    if len(rack.get_plate_ids()) == 0:
        db.session.delete(rack)
        db.session.commit()
        return {"deleted": True, "message": "Rack deleted"}
    return {"deleted": False,
            "message": f"Rack has following plates: {rack.get_plate_ids()}"}
