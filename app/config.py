import os

class Config(object):
    SECRET_KEY=os.environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace(
            "postgres://", "postgresql://", 1)

    SQLALCHEMY_ECHO=True
