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
            plate_id=form.data["plate_id"],
            box_id=form.data["box_id"],
            sample_type=form.data["sample_type"],
            accession_date=form.data["accession_date"],
            store_date=form.data["store_date"],
            thaw_count=form.data["thaw_count"],
            expiry_date=form.data["expiry_date"],
            discarded=form.data["discarded"],
        )
        db.session.add(sample)
        Well.create_sample_well(sample)
        db.session.commit()
    if form.errors:
        return {"errors": form.errors}
    return {"sample": sample.to_dict()}


# POST /api/samples/
@sample_routes.route("/<int:sample_id>/store", methods=["POST"])
@login_required
def store_sample(sample_id):
    sample = Sample.query.get(sample_id)

    request_body = request.get_json()
    plate_id = request_body["plate_id"]
    stored_sample = store_sample_in_well(plate_id, sample_id)
    if stored_sample.errors:
        return store_sample.errors
    else:
        db.session.commit()
        return store_sample.success


def store_sample_in_well(plate_id, sample_id):
    """
    Given a plate_id and a sample_id, attempts to place the sample in a plate
    well. If no empty positions on given plate, returns False.
    """
    plate = Plate.query.get(plate_id)
    if plate.open_well <= plate.max_well:
        # if there's an opening on the plate....
        sample_well = Well(well_position=plate.open_well,
                           sample_id=sample_id,
                           plate_id=plate_id,
                           )
        db.session.add(sample_well)
        plate.store_sample_in_well()
        return {"success": f"Sample #{sample_id} stored in plate #{plate_id}, \
                            well #{plate.open_well - 1}"}
    else:
        return {"errors": "Given plate has no open spots"}


# PATCH /api/samples/:id
@sample_routes.route("/<int:sample_id>", methods=["PATCH"])
@login_required
def edit_sample(sample_id):
    sample = Sample.query.get(sample_id)
    request_body = request.get_json()
    # check for any properties and patch them
    sample.plate_id = request_body["plate_id"]
    sample.box_id = request_body["box_id"]
    sample.sample_type = request_body["sample_type"]
    sample.accession_date = request_body["accession_date"]
    sample.store_date = request_body["store_date"]
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
