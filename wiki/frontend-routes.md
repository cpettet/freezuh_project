# User-facing routes

## Freezers List Page: `/freezers`
---
This page displays all of the freezers. These should be CSS/HTML creations with the respective Ids. Clicking on a freezer opens up its page showing its properties and contents (racks and boxes).

Posting to this route will create a new freezer with the designated properties.

- `GET /freezers`
- `POST /freezers`

## Individual Freezer Page: `/freezers/:id`
---
This page should display all of the properties of the selected freezer in text fields, an edit button, and a decommission button.

Depending on the page size, the individual freezer page will also show the boxes and racks stored in the freezer. On larger displays, these will be HTML/CSS (color-coded from green to white depending on empty positions) creations with their respective IDs that will link to the respective box or rack. Smaller displays will use dropdowns for the same functionality.

Clicking on the edit button will unlock the editable text fields and show a submit and cancel button. Editing the properties and clicking the submit button will update the database and refresh the page. Clicking cancel will grab the reset the properties in the text fields and lock them.

Clicking on an empty freezer's decommission button will effectively delete the freezer by not allowing it to store items. A deactivated freezer's page will have a large, transparent 'DECOMMISSIONED' div overlaying the text fields, along with a reactivation button instead of a decommission button.

- `GET /freezers/:id`
- `PUT /freezers/:id`
- `DELETE /freezers/:id`

## Boxes List Page: `/boxes`
---
This page displays all of the boxes. These should be CSS/HTML creations with the respective Ids. Clicking on a box opens up its page showing its properties and contents (samples).

Posting to this route will create a new box with the designated properties.
- `GET /boxes`
- `POST /boxes`

## Individual Box Page: `/boxes/:id`
---
This page should display all of the properties of the selected box in text fields, an edit button, and a decommission button.

Depending on the page size, the individual box page will also show the samples stored in the box. On larger displays, these will be HTML/CSS tables/cells linking to the respective sample. Smaller displays will use dropdowns for the same functionality.

Clicking on the edit button will unlock the editable text fields and show a submit and cancel button. Editing the properties and clicking the submit button will update the database and refresh the page. Clicking cancel will grab the reset the properties in the text fields and lock them.

Clicking on an empty box's decommission button will effectively delete the box by not allowing it to store items. A deactivated box's page will have a large, transparent 'DECOMMISSIONED' div overlaying the text fields, along with a reactivation button instead of a decommission button. This would be useful for older boxes that may be damaged by freezer/refrigerator condensation.

- `GET /boxes/:id`
- `PUT /boxes/:id`
- `DELETE /boxes/:id`

## Boxes List Page: `/racks`
---
This page displays all of the racks. These should be CSS/HTML creations with the respective Ids. Clicking on a rack opens up its page showing its properties and contents (samples or boxes).

Posting to this route will create a new rack with the designated properties.

- `GET /racks`
- `POST /racks`

## Individual Box Page: `/racks/:id`
---
This page should display all of the properties of the selected rack in text fields, an edit button, and a decommission button.

Depending on the page size, the individual rack page will also show the plates or boxes stored in the box. On larger displays, these will be HTML/CSS tables/cells linking to the respective sample. Smaller displays will use dropdowns for the same functionality.

Clicking on the edit button will unlock the editable text fields and show a submit and cancel button. Editing the properties and clicking the submit button will update the database and refresh the page. Clicking cancel will grab the reset the properties in the text fields and lock them.

Clicking on an empty rack's decommission button will effectively delete the rack by not allowing it to store items. A deactivated box's page will have a large, transparent 'DECOMMISSIONED' div overlaying the text fields, along with a reactivation button instead of a decommission button.

- `GET /racks/:id`
- `PUT /racks/:id`
- `DELETE /racks/:id`

## Plates List Page: `/plates`
---
This page displays all of the plates. These should be CSS/HTML creations with the respective Ids. Clicking on a rack opens up its page showing its properties and contents (samples).

Posting to this route will create a new plate with the designated properties. Note: this will not store the plate, only create it for sample storage.

- `GET /plates`
- `POST /plates`

## Individual Plate Page: `/plates/:id`
---
This page should display all of the properties of the selected rack in text fields, an edit button, and a discard button. In a section of the page, there will be a check-in or check-out button depending on the current state of the plate. Checking out a plate will update the thaw count of the plate and all of its samples. *It will also log the actions (check-in & time, check-out & time).*

Depending on the page size, the individual plate page will also show the samples stored in the box. On larger displays, these will be HTML/CSS tables/cells linking to the respective sample. Smaller displays will use dropdowns for the same functionality.

Clicking on the edit button will unlock the editable text fields and show a submit and cancel button. Editing the properties and clicking the submit button will update the database and refresh the page. Clicking cancel will grab the reset the properties in the text fields and lock them.

Clicking on the discard button will also discard samples on the plate.

- `GET /plates/:id`
- `PUT /plates/:id`
- `DELETE /plates/:id`

## Samples List Page: `/samples`
---
This page displays all of the samples (or 150/page). These should be in a list with relevant properties displayed. Clicking on a sample opens up its page showing its properties.

Posting to this route will create a new sample with the designated properties.

- `GET /plates`
- `POST /plates`

## Individual Sample Page: `/samples/:id`
---
This page should display all of the properties of the selected sample in text fields, an edit button, and a decommission button. In a section of the page, there will be a check-in or check-out button depending on the current state of the plate. Checking out a sample will update the thaw count and change the button. *It will also log the actions (check-in & time, check-out & time).*

Checking out a sample will allow it to be moved to another plate/box or used for an experiment. A reason dropdown menu will be given for checkout with options of relocation, experiment (all of sample), or experiment (part of sample). Selecting all of sample experiment will also call the delete route.

Checking in the sample will store it in its designated spot automatically or it will be able to be selected from available spots. Available plates (not checked-in) and boxes will be shown. From there, a spot can be chosen for the sample to be stored, and confirmed.

Clicking on the edit button will unlock the editable text fields and show a submit and cancel button. Editing the properties and clicking the submit button will update the database and refresh the page. Clicking cancel will grab the reset the properties in the text fields and lock them.

The discard button will effectively delete the sample. Its status will change, but it will still be shown in the database. Its individual sample page will be locked for editing and it will show a header saying the properties are for informational use only.

- `GET /plates/:id`
- `PUT /plates/:id`
- `DELETE /plates/:id`