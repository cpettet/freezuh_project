from app.aws import allowed_file, get_unique_filename, upload_file_to_s3
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
    if "manifest" in request.files:
        manifest = request.files["manifest"]
        if not allowed_file(manifest.filename):
            return {"errors": "file type not supported"}, 400

        manifest.filename = get_unique_filename(manifest.filename)

        upload = upload_file_to_s3(manifest)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
    else:
        url = ""

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
            manifest_url=url,
        )
        db.session.add(sample)
        db.session.flush()
        if form.data["plate_id"] is not None:
            plate_id = form.data["plate_id"]
            plate = Plate.query.get(plate_id)
            if form.data["well_id"] is not None:
                well_id = form.data["well_id"]
                res = plate.store_sample_in_well(sample.id, well_id)
            else:
                res = plate.store_sample_in_well(sample.id)

    if form.errors:
        return {"errors": form.errors}, 400
    if "errors" in res:
        return {"errors": [res["errors"]]}, 400
    else:
        db.session.commit()
        return {"sample": sample.to_dict()}


# PATCH /api/samples/:id
@sample_routes.route("/<int:sample_id>", methods=["PATCH"])
@login_required
def edit_sample(sample_id):
    if "manifest" in request.files:
        manifest = request.files["manifest"]
        if not allowed_file(manifest.filename):
            return {"errors": "file type not supported"}, 400

        manifest.filename = get_unique_filename(manifest.filename)

        upload = upload_file_to_s3(manifest)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
    else:
        url = ""

    sample = Sample.query.get(sample_id)
    form = SampleForm()
    print("Here's the form:", form)
    if "manifest" in request.files:
        sample.manifest_url = url
    if (sample.get_plate_id() != form.data["plate_id"] or
            sample.get_well_id() != form.data["well_id"]):
        plate_id = form.data["plate_id"]
        plate = Plate.query.get(plate_id)
        if "well_id" in form.data:
            plate.store_sample_in_well(sample_id, form.data["well_id"])
        else:
            plate.store_sample_in_well(sample_id)
    if sample.get_plate_id() != "N/A" and form.data["store_date"]:
        sample.store_date = form.data["store_date"]
    sample.sample_type = form.data["sample_type"]
    sample.accession_date = form.data["accession_date"]
    sample.expiration_date = form.data["expiry_date"]
    sample.thaw_count = form.data["thaw_count"]
    sample.discarded = form.data["discarded"]

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
