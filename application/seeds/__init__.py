from flask.cli import AppGroup
# from .users import seed_users, undo_users

seed_commands = AppGroup("seed")

@seed_commands.command("all")
def seed():
    # Add all seed functions here
    pass

@seed_commands.command("undo")
def undo():
    # Add all un-seed functions here
    pass