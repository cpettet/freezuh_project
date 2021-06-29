from application.models import db, Sample

def seed_samples():
    demo = Sample()
    
    db.session.add(demo)
    db.session.commit()
    
def undo_samples():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE samples RESTART IDENTITY CASCADE;")
    db.session.commit()
