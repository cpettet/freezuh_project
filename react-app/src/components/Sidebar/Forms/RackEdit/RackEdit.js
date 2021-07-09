import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { editRack, getRacks } from "../../../../store/rack";

function RackEdit() {
  const { rackId } = useParams();
  const rack = useSelector((state) => state.racks.byId[rackId]);
  const history = useHistory();
  const dispatch = useDispatch();

  const [freezerId, setFreezerId] = useState(rack?.freezer_id);
  const [maxPosition, setMaxPosition] = useState(rack?.max_position);
  const [discarded, setDiscarded] = useState(rack?.discarded);

  useEffect(() => {
    dispatch(getRacks());
  }, [dispatch]);

  const submitRack = async (e) => {
    e.preventDefault();
    await dispatch(
      editRack({
        id: rack?.id,
        freezer_id: freezerId,
        max_position: maxPosition,
        discarded: discarded,
      })
    );
    history.push(`/racks/${rackId}`);
  };

  const getFirstOpenFreezerPosition = (e) => {
    e.preventDefault();
    // TODO: populate with first available freezer position
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
        <button
          className={style.sidebar__button}
          onClick={getFirstOpenFreezerPosition}
        >
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
