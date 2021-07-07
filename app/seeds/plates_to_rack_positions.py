from app.models import db, Rack


def seed_rack_positions():
    rack1 = Rack.query.get(1)
    rack2 = Rack.query.get(2)
    rack3 = Rack.query.get(3)
    rack4 = Rack.query.get(4)
    rack5 = Rack.query.get(5)
    for num in range(2, 26):
        rack1.store_plate_in_position(num)
    for num in range(26, 51):
        rack2.store_plate_in_position(num)
    for num in range(51, 77):
        rack3.store_plate_in_position(num)
    for num in range(77, 90):
        rack4.store_plate_in_position(num)
    for num in range(90, 102):
        rack5.store_plate_in_position(num)
    db.session.commit()


def undo_rack_positions():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE rack_positions RESTART IDENTITY CASCADE;")
    db.session.commit()
