from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required
from application.models import db, Sample
from application.forms import SampleForm

sample_routes = Blueprint("samples", __name__)

# GET /api/samples/
@sample_routes.route("/", methods=["GET"])
# @login_required
def get_samples():
    print("\n\nHere we are, in the /api/samples route")
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
            plate_id=form.data["plate_id"],
            box_id=form.data["box_id"],
            sample_type=form.data["sample_type"],
            accession_date=form.data["accession_date"],
            store_date=form.data["accession_date"],
            thaw_count=form.data["thaw_count"],
            expiry_date=form.data["expiry_date"],
            discarded=form.data["discarded"],
        )
        db.session.add(sample)
        db.session.commit()
    if form.errors:
        return {"errors": form.errors}
    return {"sample": sample.to_dict()}

# PATCH /api/samples/:id
@sample_routes.route("/<int:sample_id>", methods=["PATCH"])
@login_required
def edit_sample(sample_id):
    sample = Sample.query.get(sample_id)
    request_body = request.get_json()
    # check for any properties and patch them
    for key, value in request_body:
        sample[key] = value
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
