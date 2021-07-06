import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import style from "./RackForm.module.css";
import { createRack } from "../../../../store/rack";

function RackForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [freezerId, setFreezerId] = useState();
  const [maxPosition, setMaxPosition] = useState(25);

  const submitRack = async (e) => {
    e.preventDefault();
    const newRack = await dispatch(
      createRack({
        ...(freezerId && { freezer_id: freezerId }),
        ...(maxPosition && { max_position: maxPosition }),
        discarded: false,
      })
    );
    const newRackId = newRack.rack.id;
    history.push(`/racks/${newRackId}`);
  };

  const getFirstOpenFreezerPosition = e => {
    e.preventDefault();
    // TODO: populate with first available position
  }

  return (
    <form className={style.navbar__form} onSubmit={submitRack}>
      <div>
        <label htmlFor="freezer_id">Freezer Id: </label>
        <input
          value={freezerId}
          onChange={(e) => setFreezerId(e.target.value)}
          type="number"
          placeholder="Enter open freezer Id"
          min="1"
        />
        <button onClick={getFirstOpenFreezerPosition}>
          Populate Freezer ID
        </button>
      </div>
      <div>
        <label htmlFor="max_position">Max positions: </label>
        <input
          value={maxPosition}
          onChange={(e) => setMaxPosition(e.target.value)}
          type="number"
          placeholder="Enter max positions in rack"
          min="1"
        />
      </div>
      <button type="submit">Create Rack</button>
    </form>
  );
}

export default RackForm;
