# MVP Feature List

## Freezers
### Freezer Initialization
- Create a new freezer with the following properties: room number (ENUM), location (ENUM), open spots.
- Freezers can take ~20 racks, initialized to 20 open_positions.

### Freezer Viewing
- Can select a freezer to view from a list.
    - The list will be sorted alphabetically by location and then by number.
    - The list sorting will be handled by sequelize findAll.
- Selecting a freezer will show the racks, free boxes, and free plates.
    - The list will be grouped by racks, boxes, and free plates and each group will be sorted by its respective group ids.
    - The list sorting will be handled by sequelize findAll on Freezers.

### Freezer Editing
- After selecting a freezer, can edit its properties.
    - Only super-users can edit freezer properties.
    - Editable properties are room number and location.

### Freezer Decomissioning
- On the edit screen, can choose to decommission (effectively DELETE) the freezer.
    - Can only decommission freezer after removing all contents.
- Decommissioned freezers will be unable to hold any racks, free boxes, or free plates.
- Decommissioned freezers will remain in database due to tracking.

## Samples
### Sample Creation and Storage
- Create a new sample with following properties: type (ENUM with: blood, different tissues, etc.), accession date.
- Upon creating new sample, allow storage to either a plate or a box.
    - Plate xor box.
    - Automatically set store date to current date, and thaw count to 0. Expiration date is set dependent on sample type.

### Updating Sample Properties
- Allow users to update properties.

### Sample Retrieval
- Allows sample retrieval/checkout.
- Can check-in sample, increment thaw count by 1.

## Freezer Racks
- Freezer racks are designed to be held in freezers, with ~4-5 per shelf, 20 racks per freezer.
### Rack Creation
- Create a new rack with a freezer id.
- During rack creation, can only add to freezer with any number of open spaces.

### Rack Viewing
- Can view the different boxes/plates in a rack.
- Can select a plate and choose to check out a plate.
- Can select a box and view the samples.

### Rack Editing
- Can choose to move a rack from one freezer to another. Does not affect thaw counts for samples/plates.

### Rack Decomissioning
- Rarely used, not going to be implemented.

## Freezer Boxes
- Freezer boxes are designed to hold samples. Different-sized boxes hold different amounts of samples.
- Freezer boxes can be stored in a rack, or in a freezer.

### Box Creation
- Freezer boxes are initialized at a freezer or a rack position, NOT BOTH.
- The open position starts at 1 and continues to the max position, VARIES.

### Box Viewing
- The box can be selected and all samples can be viewed.

### Box Editing
- The box can be reassigned to a different rack or freezer.

### Box Decomissioning
- Rarely used, not going to be implemented.

## Plates
- Plates are designed to hold samples. Due to how a plate is made, a plate full of samples will be thawed if only one is needed.
- Plates come in a standard 96-well/96-sample size.
- Plates are filled with samples at the start, no samples can be added after first creation.

### Plate Creation
- Plates are created with all samples added, and stored in a rack.

### Plate Viewing
- Plates can be viewed. All samples can be viewed along with any properties.

### Plate Editing
- Plates can be moved to different racks.

### Plate Retrieval
- Plates can be retrieved for sample retrieval. Thaw count is increased by one, in addition to all samples' thaw counts.