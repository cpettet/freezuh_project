from app.models import db, Rack


def seed_racks():
    demo1 = Rack()
    demo2 = Rack()
    demo3 = Rack()
    demo4 = Rack()
    demo5 = Rack()
    demo6 = Rack()
    demo7 = Rack()
    demo8 = Rack()
    demo9 = Rack()
    demo10 = Rack()
    demo11 = Rack()
    demo12 = Rack()
    demo13 = Rack()
    demo14 = Rack()
    demo15 = Rack()
    demo16 = Rack()
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
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.add(demo15)
    db.session.add(demo16)
    db.session.commit()


def undo_racks():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE racks RESTART IDENTITY CASCADE;")
    db.session.commit()
