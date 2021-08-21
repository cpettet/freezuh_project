from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Rack, Freezer
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
        db.session.flush()
        if form.data["freezer_id"] is not None:
            freezer_id = form.data["freezer_id"]
            freezer = Freezer.query.get(freezer_id)
            if form.data["freezer_position"] is not None:
                freezer_position = form.data["freezer_position"]
                res = freezer.store_rack_in_position(rack.id, freezer_position)
            else:
                res = freezer.store_rack_in_position(rack.id)
    if form.errors:
        return {"errors": form.errors}, 400
    if "errors" in res:
        return {"errors": [res["errors"]]}, 400
    else:
        db.session.commit()
        return {"rack": rack.to_dict(), "success": res}


# PATCH /api/racks/:id/
@rack_routes.route("/<int:rack_id>", methods=["PATCH"])
@login_required
def edit_rack(rack_id):
    rack = Rack.query.get(rack_id)
    request_body = request.get_json()
    # PATCH into the database
    if (rack.get_freezer_id() != request_body["freezer_id"] or
            rack.get_freezer_position()) != request_body["freezer_position"]:
        freezer_id = request_body["freezer_id"]
        freezer = Freezer.query.get(freezer_id)
        if "freezer_position" in request_body:
            res = freezer.store_rack_in_position(
                rack.id, request_body["freezer_position"])
        else:
            res = freezer.store_rack_in_position(rack.id)
    rack.max_position = request_body["max_position"]
    if request_body["discarded"] is True:
        if len(rack.get_plates_ids()) == 0:
            rack.discarded = True
        else:
            res = {"errors": "Rack has following plates:" +
                   f" {rack.get_plates_ids()}. Please move before deleting."}
    if "errors" in res:
        return {"errors": [res["errors"]]}, 400
    else:
        db.session.commit()
        return {"rack": rack.to_dict(), "success": res}


# DELETE /api/racks/:id/
@rack_routes.route("/<int:rack_id>", methods=["DELETE"])
@login_required
def delete_rack(rack_id):
    rack = Rack.query.get(rack_id)
    if len(rack.get_plates_ids()) == 0:
        rack.discarded = True
        db.session.commit()
        return {"rack": rack.to_dict()}
    return {"rack": rack.to_dict(),
            "errors": f"Rack is storing the following plates:" +
            f" {rack.get_plates_ids()}." +
            "Please move stored plates before deleting."}
