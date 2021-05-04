# Template: As a .... I want to .... so that ....
## Freezers
- As a super user, I want to create/activate new freezers so that other users can store racks and boxes in them.
- As a super user, I want to decommission empty freezers so that items cannot be stored to them.
- As a user, I want to view all freezers so that I can view the open spots for rack and box storage.
- As a user, I want to view all freezer contents (racks and boxes) so that I can choose one to view its contents.

## Racks
- As a user, I want to create new racks to store boxes/plates.
- As a user, I want to edit empty racks to change their properties.

## Boxes
- As a user, I want to create new boxes to store samples.
- As a user, I want to edit my box properties in cases of data entry errors.
- As a user, I want to view all samples stored in a particular box.

## Plates
- As a user, I want to create new plates to store samples.
- As a user, I want to view all samples stored in the plate to check what the plate contains.
- As a user, I want to manually store samples in any plate position to tailor plates for any experiments (liquid handlers could use half of plate, check for contamination or liquid carryover to adjacent wells).
- As a user, I want to store plates to be used for later.
- As a user, I want to checkout plates for experimentation, also updating the thaw_count for the plate and its samples and the open_position.

## Samples
- As a user, I want to accession/create a new sample to store.
- As a user, I want to view any samples and its properties to gather information for experiments.
- As a user, I want to edit any properties to correct any accessioning mistakes.
- As a user, I want to store the sample in the next available box/plate position based on its storage_type to make sample storage easier. If no open positions on boxes/plates are available, I want to be prompted to create a new one.
- As a user, I want to store a sample in a specified box/plate to create custom locations (useful for pipetting into sample wells).
- As a user, I want to checkout a sample for testing and increase its thaw count to track samples' integrity and to open up the position on the box.
- As a user, I want to see all expired samples for disposal to alleviate any storage concerns (freezers are expensive).