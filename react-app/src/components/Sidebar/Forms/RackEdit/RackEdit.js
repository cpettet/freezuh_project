import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { editRack, getRacks } from "../../../../store/rack";
import { getFreezers } from "../../../../store/freezer";
import findMissingNumber from "../../../../utils/findMissingNumber";

function RackEdit() {
  const { rackId } = useParams();
  const rack = useSelector((state) => state.racks.byId[rackId]);
  const freezers = useSelector(state => state.freezers.byId);
  const history = useHistory();
  const dispatch = useDispatch();

  const [freezerId, setFreezerId] = useState(rack?.freezer_id);
  const [freezerPosition, setFreezerPosition] = useState(rack?.freezer_position);

  const [maxPosition, setMaxPosition] = useState(rack?.max_position);
  const [discarded, setDiscarded] = useState(rack?.discarded);

  useEffect(() => {
    dispatch(getRacks());
    dispatch(getFreezers())
  }, [dispatch]);

  const submitRack = async (e) => {
    e.preventDefault();
    await dispatch(
      editRack({
        id: rack?.id,
        freezer_id: freezerId,
        freezer_position: freezerPosition,
        max_position: maxPosition,
        discarded: discarded,
      })
    );
    history.push(`/racks/${rackId}`);
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
      <h3 className={style.form__header}>Editing Rack #{rack?.id}</h3>
      <div className={style.property}>
        <label htmlFor="freezer_id" className={style.property__label}>
          Freezer ID:
        </label>
        <input
          className={style["property__field-small"]}
          value={freezerId}
          onChange={(e) => setFreezerId(e.target.value)}
          type="number"
          placeholder="Enter ID"
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
        <label htmlFor="max_position" className={style.property__label}>
          Max racks:
        </label>
        <input
          className={style.property__field}
          value={maxPosition}
          onChange={(e) => setMaxPosition(e.target.value)}
          type="number"
          placeholder="Enter max racks"
        />
      </div>
      <div className={style.property}>
        <label htmlFor="discarded" className={style.property__label}>
          Rack Discarded:{" "}
        </label>
        <label>
          <input
            className={style.property__field}
            type="radio"
            name="discarded"
            value="true"
            checked={discarded === true}
            onChange={() => setDiscarded(true)}
          />
          Yes
        </label>
        <label>
          <input
            className={style.property__field}
            type="radio"
            name="discarded"
            value="false"
            checked={discarded === false}
            onChange={() => setDiscarded(false)}
          />
          No
        </label>
      </div>
      <button className={style.sidebar__button} type="submit">
        Submit Changes
      </button>
    </form>
  );
}

export default RackEdit;
