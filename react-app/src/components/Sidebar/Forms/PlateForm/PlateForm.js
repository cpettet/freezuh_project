import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import style from "./PlateForm.module.css";
import { createPlate } from "../../../../store/plate";
import getInputDateTime from "../../../../utils/getInputDateTime";

function PlateForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [rackId, setRackId] = useState(null);
  const [storeDate, setStoreDate] = useState(null);
  const [stored, setStored] = useState(false);

  const submitPlate = async (e) => {
    e.preventDefault();
    const newPlate = await dispatch(
      createPlate({
        ...(rackId && { rack_id: rackId }),
        ...(storeDate && { store_date: storeDate }),
        max_well: 96,
        thaw_count: 0,
        discarded: false,
      })
    );
    const newPlateId = newPlate.plate.id;
    history.push(`/plates/${newPlateId}`);
  };

  const getFirstOpenRackPosition = (e) => {
    e.preventDefault();
    // TODO: populate with first available position
  };

  return (
    <form className={style.navbar__form} onSubmit={submitPlate}>
      <div>
        <label htmlFor="stored">Plate stored? </label>
        <label>
          <input
            type="radio"
            name="stored"
            checked={stored === true}
            onClick={() => {
              setStored(true);
              setStoreDate(getInputDateTime());
            }}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="stored"
            checked={stored === false}
            onClick={() => {
              setStored(false);
              setStoreDate(null);
            }}
          />
          No
        </label>
      </div>
      <div
        className={stored ? style.navbar__field : style["navbar__field-hidden"]}
      >
        <label htmlFor="rack_id">Rack Id: </label>
        <input
          value={rackId}
          onChange={(e) => setRackId(e.target.value)}
          type="number"
          placeholder="Enter open rack Id"
        />
        <button onClick={getFirstOpenRackPosition}>Populate Rack ID</button>
      </div>
      <div
        className={stored ? style.navbar__field : style["navbar__field-hidden"]}
      >
        <label htmlFor="store_date">Storage Date:</label>
        <input
          type="datetime-local"
          value={storeDate}
          onChange={(e) => setStoreDate(e.target.value)}
        />
      </div>
      <button type="submit">Create Plate</button>
    </form>
  );
}

export default PlateForm;
