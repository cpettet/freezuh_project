from app.seeds.plates import seed_plates
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .samples import seed_samples, undo_samples
from .plates import seed_plates, undo_plates

seed_commands = AppGroup("seed")


@seed_commands.command("all")
def seed():
    # Add all seed functions here
    seed_users()
    seed_plates()
    seed_samples()


@seed_commands.command("undo")
def undo():
    # Add all un-seed functions here
    undo_users()
    undo_samples()
    undo_plates()
