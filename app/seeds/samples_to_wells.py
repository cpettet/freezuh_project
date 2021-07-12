from app.models import db, Plate


def seed_wells():
    plate1 = Plate.query.get(1)
    plate2 = Plate.query.get(2)
    plate3 = Plate.query.get(3)
    plate4 = Plate.query.get(4)
    for num in range(8, 105):
        plate1.store_sample_in_well(num)
    for num in range(105, 200):
        plate2.store_sample_in_well(num)
    for num in range(200, 248):
        plate3.store_sample_in_well(num)
    for num in range(248, 297):
        plate4.store_sample_in_well(num)
    db.session.commit()


def undo_wells():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE wells RESTART IDENTITY CASCADE;")
    db.session.commit()
