from app.models import db, Rack


def seed_rack_positions():
    rack_to_add_to = Rack.query.get(1)
    rack_to_add_to.store_plate_in_position(1)
    db.session.commit()


def undo_rack_positions():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE rack_positions RESTART IDENTITY CASCADE;")
    db.session.commit()
