from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Sample, Well, Plate
from app.forms import SampleForm

sample_routes = Blueprint("samples", __name__)


# GET /api/samples/
@sample_routes.route("/", methods=["GET"])
@login_required
def get_samples():
    samples = Sample.query.all()
    return {"samples": [sample.to_dict() for sample in samples]}


# POST /api/samples/
@sample_routes.route("/", methods=["POST"])
@login_required
def new_sample():
    form = SampleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        sample = Sample(
            sample_type=form.data["sample_type"],
            accession_date=form.data["accession_date"],
            store_date=form.data["store_date"],
            thaw_count=form.data["thaw_count"],
            expiry_date=form.data["expiry_date"],
            discarded=form.data["discarded"],
        )
        db.session.add(sample)
        db.session.commit()
        if form.data["plate_id"] is not None:
            # TODO: Start working on well_id here
            plate_id = form.data["plate_id"]
            plate = Plate.query.get(plate_id)
            plate.store_sample_in_well(sample.id)
            if form.data["well_id"] is not None:
                well_id = form.data["well_id"]
                plate.store_sample_in_well(sample.id, well_id)
    if form.errors:
        return {"errors": form.errors}
    return {"sample": sample.to_dict()}


# PATCH /api/samples/:id
@sample_routes.route("/<int:sample_id>", methods=["PATCH"])
@login_required
def edit_sample(sample_id):
    sample = Sample.query.get(sample_id)
    request_body = request.get_json()
    if sample.get_plate_id() != request_body["plate_id"]:
        plate_id = request_body["plate_id"]
        plate = Plate.query.get(plate_id)
        if "well_id" in request_body:
            plate.store_sample_in_well(sample_id, request_body["well_id"])
        else:
            plate.store_sample_in_well(sample_id)
    if sample.get_plate_id() != "N/A" and request_body["store_date"]:
        sample.store_date = request_body["store_date"]
    sample.sample_type = request_body["sample_type"]
    sample.accession_date = request_body["accession_date"]
    sample.expiration_date = request_body["expiry_date"]
    sample.thaw_count = request_body["thaw_count"]
    sample.discarded = request_body["discarded"]

    db.session.commit()
    return {"sample": sample.to_dict()}


# DELETE /api/samples/:id
@sample_routes.route("/<int:sample_id>", methods=["DELETE"])
@login_required
def delete_sample(sample_id):
    sample = Sample.query.get(sample_id)
    sample.discarded = True
    db.session.commit()
    return {"sample": sample.to_dict(), "message": "Sample discarded."}
