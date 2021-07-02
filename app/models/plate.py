from . import db
# plate
#   one-to-many table
#   position/well would be enum: positions 1-96
#   STILL keep track of next available position
#       well 1: sample 1
#       well 2: sample 2
#       well 3: empty
#       ...
#       well 96: empty


class Well(db.Model):
    """
    Technically a "joins" table between plate and sample.
    """
    __tablename__ = "wells"

    id = db.Column(db.Integer, primary_key=True)
    well_position = db.Column(db.Integer, nullable=False)
    sample_id = db.Column(db.Integer, db.ForeignKey("samples.id"))
    plate_id = db.Column(db.Integer,
                         db.ForeignKey("plates.id", ondelete="CASCADE"),
                         nullable=False)

    # self.sample.plate_id => plate => plate.samples => # of samples =>
    #   # + 1 => next available => if # + 1 < 96 => add to plate

    # Associations
    plate = db.relationship("Plate", back_populates="wells")
    sample = db.relationship("Sample", back_populates="well")

    def create_sample_well(sample):
        """
        Functions as a constructor to create a well for a sample in a plate.
        """
        sample_id = sample.id
        plate_id = sample.plate_id

        samples_in_plate = len(sample.plate.samples)
        well_position = samples_in_plate + 1 if samples_in_plate < 96 else 1

        temp = Well(sample_id=sample_id,
                    well_position=well_position,
                    plate_id=plate_id,
                    )
        db.session.add(temp)
        db.session.commit()
    # Creating a sample
    # Well.create_sample_well(sample)


class Plate(db.Model):
    """
    Required: none
    Todo: samples should know position
    """
    __tablename__ = "plates"

    id = db.Column(db.Integer, primary_key=True)
    rack_id = db.Column(db.Integer, nullable=True)
    thaw_count = db.Column(db.Integer, default=0, nullable=False)
    store_date = db.Column(db.DateTime, nullable=True)
    discarded = db.Column(db.Boolean, default=False, nullable=False)

    open_well = db.Column(db.Integer, default=1, nullable=False)
    max_well = db.Column(db.Integer, default=96, nullable=False)
    stored = db.Column(db.Boolean, default=False, nullable=False)

    next_position = 1
    # increment Plate.next_position
    # when creating a new plate, increment next_position by 1 except when at 96 already
    # looking at seed data: increment

    # on frontend/store:
    #   maybe not necessary
    #   know the next position of the plate to query
    #   update the store

    # def store_sample_in_well(self):
    #     """
    #     After finding the first available space for a sample, stores a sample
    #     in the space, and moves the next available spot up by one.
    #     """
    #     if self.open_well <= self.max_well:
    #         self.open_well += 1
    #         return {
    #             "status": True,
    #             "message":
    #                 f"Successfully stored sample in {self.open_well - 1}",
    #             }
    #     else:
    #         return {"status": False, "error": "No open positions."}

    # Associations
    # rack = db.relationship("Rack", back_populates="plates")
    samples = db.relationship("Sample", back_populates="plate",
                              passive_deletes=True,
                              cascade="all,delete-orphan")
    wells = db.relationship("Well", back_populates="plate",
                            passive_deletes=True,
                            cascade="all,delete-orphan")

    def get_samples(self):
        return [sample.to_dict() for sample in self.samples]

    def discard_plate(self):
        """
        Sets the plate's discarded value to True. Iterates through all stored
        samples on plate and discards them.
        """
        self.discarded = True
        for sample in self.samples:
            sample.discarded = True

    def thaw_plate(self):
        """
        Thaws the current plate and increments the thaw_count. For each sample
        stored in the plate, increment its thaw count.
        """
        self.thaw_count += 1
        for sample in self.samples:
            sample.thaw_count += 1

    def to_dict(self):
        return {
            "id": self.id,
            "rack_id": self.rack_id,
            "thaw_count": self.thaw_count,
            "store_date": self.store_date,
            "discarded": self.discarded,
            "open_position": self.open_position,
            "max_position": self.max_position,
            "stored": self.stored,
            "samples": self.get_samples(),
            "next_position": Plate.next_position,
        }
