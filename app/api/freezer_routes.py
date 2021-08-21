from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Freezer
from app.forms import FreezerForm

freezer_routes = Blueprint("freezers", __name__)


# GET /api/freezers/
@freezer_routes.route("/", methods=["GET"])
@login_required
def get_freezers():
    freezers = Freezer.query.all()
    return {"freezers": [freezer.to_dict() for freezer in freezers]}


# POST /api/freezers
@freezer_routes.route("/", methods=["POST"])
@login_required
def new_freezer():
    form = FreezerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        freezer = Freezer(max_position=form.data["max_position"])
        db.session.add(freezer)
        db.session.commit()
    if form.errors:
        return {"errors": form.errors}
    return {"freezer": freezer.to_dict()}


# PATCH /api/freezers/:id
@freezer_routes.route("/<int:freezer_id>", methods=["PATCH"])
@login_required
def edit_freezer(freezer_id):
    freezer = Freezer.query.get(freezer_id)
    request_body = request.get_json()
    freezer.max_position = request_body["max_position"]
    if request_body["active"] is False:
        if len(freezer.get_racks()) > 0:
            return {"errors": ([f"Freezer is storing the following racks: " +
                                f"{freezer.get_racks_ids()}. Please reassign" +
                                " before deactivating."])}, 400
        freezer.active = request_body["active"]
    db.session.commit()
    return {"freezer": freezer.to_dict()}


# DELETE /api/freezers/:id
@freezer_routes.route("/<int:freezer_id>", methods=["DELETE"])
@login_required
def delete_freezer(freezer_id):
    freezer = Freezer.query.get(freezer_id)
    if len(freezer.get_racks_ids()) == 0:
        freezer.active = False
        db.session.commit()
        return {"deleted": True, "freezer": freezer.to_dict()}
    return {"deleted": False,
            "freezer": freezer.to_dict(),
            "errors":
                ([f"Freezer is storing the following racks: " +
                 f"{freezer.get_racks_ids()}. Please reassign" +
                    " before deactivating."])}, 400
