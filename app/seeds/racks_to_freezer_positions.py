from app.models import db, Freezer


def seed_freezer_positions():
    freezer1 = Freezer.query.get(1)
    freezer2 = Freezer.query.get(2)
    freezer3 = Freezer.query.get(3)
    freezer4 = Freezer.query.get(4)
    freezer1.store_rack_in_position(1)
    freezer1.store_rack_in_position(2)
    freezer1.store_rack_in_position(3)
    freezer1.store_rack_in_position(4)
    freezer1.store_rack_in_position(5)
    freezer1.store_rack_in_position(6)
    freezer1.store_rack_in_position(7)
    freezer2.store_rack_in_position(8)
    freezer2.store_rack_in_position(9)
    freezer3.store_rack_in_position(10)
    freezer3.store_rack_in_position(11)
    freezer3.store_rack_in_position(12)
    freezer3.store_rack_in_position(13)
    freezer3.store_rack_in_position(14)
    db.session.commit()


def undo_freezer_positions():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE freezer_positions RESTART IDENTITY CASCADE;")
    db.session.commit()
