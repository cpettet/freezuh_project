from flask import Blueprint, request
from app.models import db, Sample
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

manifest_routes = Blueprint("manifests", __name__)


# POST /api/manifests/:id
@manifest_routes.route("/<int:sample_id>", methods=["POST"])
@login_required
def upload_image(sample_id):
    sample = Sample.query.get(sample_id)
    if "manifest" not in request.files:
        return {"errors": "manifest required"}, 400

    manifest = request.files["manifest"]

    if not allowed_file(manifest.filename):
        return {"errors": "file type not permitted"}, 400

    manifest.filename = get_unique_filename(manifest.filename)

    upload = upload_file_to_s3(manifest)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    sample.manifest_url = url
    db.session.commit()
    return {"url": url}
