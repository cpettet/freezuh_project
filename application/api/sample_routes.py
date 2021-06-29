from flask import Blueprint, request
from flask_login import login_required
from application.models import Sample
from application.forms import SampleForm

sample_routes = Blueprint("samples", __name__)

# GET /api/samples/
@sample_routes.route("/", methods=["GET"])
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

# PUT /api/samples/:id
@sample_routes.route("/", methods=["PUT"])
@login_required
def edit_sample():
    pass

# DELETE /api/samples/:id
@sample_routes.route("/", methods=["DELETE"])
@login_required
def delete_sample():
    pass