from app.models import db, Sample
from datetime import datetime

def seed_samples():
    demo = Sample(sample_type="whole_blood", expiry_date=datetime.now())
    db.session.add(demo)
    db.session.commit()
    
def undo_samples():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE samples RESTART IDENTITY CASCADE;")
    db.session.commit()
