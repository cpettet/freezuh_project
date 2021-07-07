from app.models import db, Freezer


def seed_freezers():
    demo1 = Freezer()
    demo2 = Freezer()
    demo3 = Freezer()
    demo4 = Freezer()
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


def undo_freezers():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE freezers RESTART IDENTITY CASCADE;")
    db.session.commit()
