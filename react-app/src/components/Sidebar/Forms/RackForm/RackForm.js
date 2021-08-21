import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { createRack } from "../../../../store/rack";
import { getFreezers } from "../../../../store/freezer";
import findMissingNumber from "../../../../utils/findMissingNumber";

function RackForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const freezers = useSelector((state) => state.freezers.byId);
  const [errors, setErrors] = useState([]);
  const [freezerId, setFreezerId] = useState(
    location.state?.freezerId ? location.state.freezerId : ""
  );
  const [freezerPosition, setFreezerPosition] = useState(
    location.state?.freezerPosition ? location.state.freezerPosition : ""
  );
  const [maxPosition, setMaxPosition] = useState(25);

  useEffect(() => {
    dispatch(getFreezers());
  }, [dispatch]);

  const submitRack = async (e) => {
    setErrors([]);
    e.preventDefault();
    const newRack = await dispatch(
      createRack({
        ...(freezerId && { freezer_id: freezerId }),
        ...(freezerPosition && { freezer_position: freezerPosition }),
        ...(maxPosition && { max_position: maxPosition }),
        discarded: false,
      })
    );
    if (newRack.errors) {
      setErrors(newRack.errors);
    } else {
      const newRackId = newRack?.rack?.id;
      history.push(`/racks/${newRackId}`);
    }
  };

  const getFreezerId = (e) => {
    e.preventDefault();
    const freezerForRack = Object.values(freezers)?.find(
      (freezer) => freezer.racks.length < freezer.max_position
    );
    setFreezerId(freezerForRack?.id);
  };

  const getFreezerPosition = (e) => {
    e.preventDefault();
    if (freezerId) {
      const rackPositionList = Object.keys(
        freezers[freezerId]["racks_and_positions"]
      ).map((position) => parseInt(position));
      const firstEmptyPosition = findMissingNumber(rackPositionList, 0, 25);
      if (firstEmptyPosition < parseInt(freezers[freezerId]["max_position"])) {
        setFreezerPosition(firstEmptyPosition);
      } else {
        alert(`Freezer ${freezerId} is full. Please choose new rack.`);
        setFreezerId("");
        setFreezerPosition("");
      }
    } else {
      getFreezerId(e);
    }
  };

  return (
    <form className={style.navbar__form} onSubmit={submitRack}>
      <h3 className={style.form__header}>Creating new rack</h3>
      <div className={style.errors}>
        {errors?.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>
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
        <button onClick={getFreezerId} className={style.sidebar__button}>
          Get ID
        </button>
      </div>
      <div className={style.property}>
        <label htmlFor="freezer_position_id" className={style.property__label}>
          Freezer Position:{" "}
        </label>
        <input
          className={`${style.property__field} ${style["property__field-small"]}`}
          value={freezerPosition}
          onChange={(e) => setFreezerPosition(e.target.value)}
          type="number"
          placeholder="Enter ID"
        />
        <button onClick={getFreezerPosition} className={style.sidebar__button}>
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
