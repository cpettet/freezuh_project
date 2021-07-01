from app.models import db, User

def seed_users():
    demo = User(username="Demo", email="demo@gmail.com", password="password")
    
    db.session.add(demo)
    
    db.session.commit()

def undo_users():
    # TRUNCATE removes all data from the table
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()
