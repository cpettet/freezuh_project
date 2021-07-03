from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Plate
from app.forms import PlateForm

plate_routes = Blueprint("plates", __name__)


# GET /api/plates
@plate_routes.route("/", methods=["GET"])
@login_required
def get_plates():
    plates = Plate.query.all()
    return {"plates": [plate.to_dict() for plate in plates]}


# POST /api/plates
@plate_routes.route("/", methods=["POST"])
@login_required
def new_plate():
    form = PlateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        plate = Plate(
            rack_id=form.data["rack_id"],
            thaw_count=form.data["thaw_count"],
            store_date=form.data["store_date"],
            discarded=form.data["discarded"],
            max_position=form.data["max_position"],
            stored=form.data["stored"],
        )
        db.session.add(plate)
        db.session.commit()
    if form.errors:
        return {"errors": form.errors}
    return {"plate": plate.to_dict()}


# PATCH /api/plates/:id
@plate_routes.route("/<int:plate_id>", methods=["PATCH"])
@login_required
def edit_plate(plate_id):
    plate = Plate.query.get(plate_id)
    request_body = request.get_json()
    # PATCH into the database

    db.session.commit()
    return {"plate": plate.to_dict()}


# DELETE /api/plates
@plate_routes.route("/<int:plate_id>", methods=["DELETE"])
@login_required
def delete_plate(plate_id):
    plate = Plate.query.get(plate_id)
    plate.discard_plate()
    # TODO: come back and open up a spot on the rack where plate was
    db.session.commit()
    return {"plate": plate.to_dict(), "message": "Plate discarded"}
