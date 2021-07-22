from app.models.rack import Rack
from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Plate
from app.forms import PlateForm

plate_routes = Blueprint("plates", __name__)


# GET /api/plates/
@plate_routes.route("/", methods=["GET"])
@login_required
def get_plates():
    plates = Plate.query.all()
    return {"plates": [plate.to_dict() for plate in plates]}


# POST /api/plates/
@plate_routes.route("/", methods=["POST"])
@login_required
def new_plate():
    form = PlateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        plate = Plate(
            thaw_count=form.data["thaw_count"],
            store_date=form.data["store_date"],
            discarded=form.data["discarded"],
            max_well=form.data["max_well"],
        )
        db.session.add(plate)
        db.session.commit()
        if form.data["rack_id"] is not None:
            rack_id = form.data["rack_id"]
            rack = Rack.query.get(rack_id)
            rack.store_plate_in_position(plate.id)
            if form.data["rack_position"] is not None:
                rack_position = form.data["rack_position"]
                rack.store_plate_in_position(plate.id, rack_position)
    if form.errors:
        return {"errors": form.errors}
    return {"plate": plate.to_dict()}


# PATCH /api/plates/:id/
@plate_routes.route("/<int:plate_id>", methods=["PATCH"])
@login_required
def edit_plate(plate_id):
    plate = Plate.query.get(plate_id)
    request_body = request.get_json()
    print("\n\nRequest data:", request_body)
    print("\nDatabase data:", plate.to_dict())
    if (plate.get_rack_id() != request_body["rack_id"] or
            plate.get_rack_position() != request_body["rack_position"]):
        rack_id = request_body["rack_id"]
        rack = Rack.query.get(rack_id)
        if "rack_position" in request_body:
            rack.store_plate_in_position(plate_id,
                                         request_body["rack_position"])
        else:
            rack.store_plate_in_position(plate.id)
    if plate.get_rack_id() != "N/A" and request_body["store_date"]:
        plate.store_date = request_body["store_date"]
    plate.rack_id = request_body["rack_id"]
    plate.thaw_count = request_body["thaw_count"]
    plate.discarded = request_body["discarded"]
    plate.max_well = request_body["max_well"]
    db.session.commit()
    return {"plate": plate.to_dict()}


# DELETE /api/plates/:id/
@plate_routes.route("/<int:plate_id>", methods=["DELETE"])
@login_required
def delete_plate(plate_id):
    plate = Plate.query.get(plate_id)
    plate.discard_plate()
    # TODO: come back and open up a spot on the rack where plate was
    db.session.commit()
    return {"plate": plate.to_dict(), "message": "Plate discarded"}
