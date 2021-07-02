from . import db
from datetime import datetime, timedelta


class Plate(db.Model):
    __tablename__ = "samples"

    id = db.Column(db.Integer, primary_key=True)
    