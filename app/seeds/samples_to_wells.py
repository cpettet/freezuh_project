from app.models import db, Plate, Well
from datetime import datetime


def seed_wells():
    plate_to_add_to = Plate.query.get(1)
    plate_to_add_to.store_sample_in_well(1)
    plate_to_add_to.store_sample_in_well(2)
    plate_to_add_to.store_sample_in_well(3)
    plate_to_add_to.store_sample_in_well(4)
    plate_to_add_to.store_sample_in_well(5)
    plate_to_add_to.store_sample_in_well(6)
    plate_to_add_to.store_sample_in_well(7)
    plate_to_add_to.store_sample_in_well(8)
    db.session.commit()


def undo_wells():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE wells RESTART IDENTITY CASCADE;")
    db.session.commit()
