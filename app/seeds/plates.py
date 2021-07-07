from app.models import db, Plate
from datetime import datetime


def seed_plates():
    demo1 = Plate()
    demo2 = Plate()
    demo3 = Plate()
    demo4 = Plate()
    demo5 = Plate()
    demo6 = Plate()
    demo7 = Plate()
    demo8 = Plate()
    demo9 = Plate()
    demo10 = Plate()
    plates = []
    for num in range(91):
        plates.append(Plate())
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    for plate in plates:
        db.session.add(plate)
    db.session.commit()


def undo_plates():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE plates RESTART IDENTITY CASCADE;")
    db.session.commit()
