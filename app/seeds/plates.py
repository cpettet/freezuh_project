from app.models import db, Plate
from datetime import datetime


def seed_plates():
    demo1 = Plate(store_date=datetime.now())
    db.session.add(demo1)
    db.session.commit()


def undo_plates():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE plates RESTART IDENTITY CASCADE;")
    db.session.commit()
