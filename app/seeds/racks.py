from app.models import db, Rack


def seed_racks():
    demo1 = Rack()
    db.session.add(demo1)
    db.session.commit()


def undo_racks():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE racks RESTART IDENTITY CASCADE;")
    db.session.commit()
