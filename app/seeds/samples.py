from app.models import db, Sample
from datetime import datetime


def seed_samples():
    demo1 = Sample(sample_type="whole_blood",
                   expiry_date=datetime.now(),
                   )
    demo2 = Sample(sample_type="plasma",
                   expiry_date=datetime.now(),
                   )
    demo3 = Sample(sample_type="cf_dna",
                   expiry_date=datetime.now(),
                   )
    demo4 = Sample(sample_type="whole_blood",
                   expiry_date=datetime.now(),
                   )
    demo5 = Sample(sample_type="whole_blood",
                   expiry_date=datetime.now(),
                   )
    demo6 = Sample(sample_type="plasma",
                   expiry_date=datetime.now(),
                   )
    demo7 = Sample(sample_type="cf_dna",
                   expiry_date=datetime.now(),
                   )
    demo8 = Sample(sample_type="whole_blood",
                   expiry_date=datetime.now(),
                   )
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.commit()


def undo_samples():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE samples RESTART IDENTITY CASCADE;")
    db.session.commit()
