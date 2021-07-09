import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { getFreezers } from "../../../../store/freezer";
import { createRack } from "../../../../store/rack";

function RackForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const freezers = useSelector((state) => state.freezers.byId);
  const [freezerId, setFreezerId] = useState();
  const [maxPosition, setMaxPosition] = useState(25);

  useEffect(() => {
    dispatch(getFreezers());
  }, [dispatch]);

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

  const getId = (e) => {
    e.preventDefault();
    const freezerForRack = Object.values(freezers)?.find(
      (freezer) => freezer.open_position <= freezer.max_position
    );
    setFreezerId(freezerForRack?.id);
  };

  return (
    <form className={style.navbar__form} onSubmit={submitRack}>
      <h3 className={style.form__header}>Creating new rack</h3>
      <div className={style.property}>
        <label htmlFor="freezer_id" className={style.property__label}>
          Freezer Id:{" "}
        </label>
        <input
          className={style["property__field-small"]}
          value={freezerId}
          onChange={(e) => setFreezerId(e.target.value)}
          type="number"
          placeholder="Enter ID"
          min="1"
        />
        <button onClick={getId} className={style.sidebar__button}>
          Get ID
        </button>
      </div>
      <div className={style.property}>
        <label className={style.property__label} htmlFor="max_position">
          Max positions:{" "}
        </label>
        <input
          className={style.property__field}
          value={maxPosition}
          onChange={(e) => setMaxPosition(e.target.value)}
          type="number"
          placeholder="Enter max positions in rack"
          min="1"
        />
      </div>
      <button className={style.sidebar__button} type="submit">
        Create Rack
      </button>
    </form>
  );
}

export default RackForm;
