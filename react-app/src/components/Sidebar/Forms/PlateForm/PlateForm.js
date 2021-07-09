import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import style from "../Form.module.css";
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
      <h3 className={style.form__header}>Creating new plate</h3>
      <div className={style.property}>
        <label htmlFor="stored" className={style.property__label}>
          Plate stored?{" "}
        </label>
        <label>
          <input
            type="radio"
            name="stored"
            checked={stored === true}
            onClick={() => {
              setStored(true);
              setStoreDate(getInputDateTime());
            }}
            onChange={() => setStored(true)}
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
            onChange={() => setStored(false)}
          />
          No
        </label>
      </div>
      <div className={stored ? style.property : style["property-hidden"]}>
        <label htmlFor="rack_id" className={style.property__label}>
          Rack Id:{" "}
        </label>
        <input
          className={`${style.property__field} ${style["property__field-small"]}`}
          value={rackId}
          onChange={(e) => setRackId(e.target.value)}
          type="number"
          placeholder="Enter ID"
        />
        <button
          onClick={getFirstOpenRackPosition}
          className={style.sidebar__button}
        >
          Get Rack ID
        </button>
      </div>
      <div className={stored ? style.property : style["property-hidden"]}>
        <label htmlFor="store_date" className={style.property__label}>
          Storage Date:
        </label>
        <input
          className={style.property__field}
          type="datetime-local"
          value={storeDate}
          onChange={(e) => setStoreDate(e.target.value)}
        />
      </div>
      <button className={style.sidebar__button} type="submit">
        Create Plate
      </button>
    </form>
  );
}

export default PlateForm;
