from flask import Blueprint, request
from application.models import Sample

sample_routes = Blueprint("samples", __name__)

# POST /api/samples/
@sample_routes.route("/", methods=["POST"])
def new_sample():
    pass

# GET /api/samples/
@sample_routes.route("/", methods=["GET"])
def get_samples():
    pass

# PUT /api/samples/:id
@sample_routes.route("/", methods=["PUT"])
def get_samples():
    pass

# DELETE /api/samples/:id
@sample_routes.route("/", methods=["DELETE"])
def get_samples():
    pass