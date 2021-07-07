from app.seeds.plates import seed_plates
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .samples import seed_samples, undo_samples
from .plates import seed_plates, undo_plates
from .samples_to_wells import seed_wells, undo_wells
from .racks import seed_racks, undo_racks
from .plates_to_rack_positions import seed_rack_positions, undo_rack_positions
from .freezers import seed_freezers, undo_freezers
from .racks_to_freezer_positions import (seed_freezer_positions,
                                         undo_freezer_positions)

seed_commands = AppGroup("seed")


@seed_commands.command("all")
def seed():
    # Add all seed functions here
    seed_users()
    seed_freezers()
    seed_racks()
    seed_plates()
    seed_samples()
    seed_freezer_positions()
    seed_rack_positions()
    seed_wells()


@seed_commands.command("undo")
def undo():
    # Add all un-seed functions here
    undo_wells()
    undo_rack_positions()
    undo_freezer_positions()
    undo_samples()
    undo_plates()
    undo_racks()
    undo_freezers()
    undo_users()
