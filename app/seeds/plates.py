from app.models import db, Plate
from datetime import datetime


def seed_plates():
    demo1 = Plate()
    demo2 = Plate()
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.commit()


def undo_plates():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE plates RESTART IDENTITY CASCADE;")
    db.session.commit()
