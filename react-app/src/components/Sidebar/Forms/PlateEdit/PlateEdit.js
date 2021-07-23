import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { editPlate, getPlates } from "../../../../store/plate";
import { getRacks } from "../../../../store/rack";
import getInputDateTime from "../../../../utils/getInputDateTime";
import findMissingNumber from "../../../../utils/findMissingNumber";

function PlateEdit() {
  const { plateId } = useParams();
  const plate = useSelector((state) => state.plates.byId[plateId]);
  const racks = useSelector((state) => state.racks.byId);
  const history = useHistory();
  const dispatch = useDispatch();

  const [rackId, setRackId] = useState(plate?.rack_id);
  const [rackPosition, setRackPosition] = useState(plate?.rack_position);
  const [thawCount, setThawCount] = useState(plate?.thaw_count);
  const [storeDate, setStoreDate] = useState(
    getInputDateTime(plate?.store_date)
  );
  const [discarded, setDiscarded] = useState(plate?.discarded);
  const [maxWell, setMaxWell] = useState(plate?.max_well);

  useEffect(() => {
    dispatch(getPlates());
    dispatch(getRacks());
  }, [dispatch]);

  const submitPlate = async (e) => {
    e.preventDefault();
    await dispatch(
      editPlate({
        id: plate?.id,
        rack_id: rackId,
        rack_position: rackPosition,
        thaw_count: thawCount,
        store_date: storeDate,
        discarded: discarded,
        max_well: maxWell,
      })
    );
    history.push(`/plates/${plateId}`);
  };

  const getRackId = async (e) => {
    e.preventDefault();
    const rackForPlate = Object.values(racks)?.find(
      (rack) => rack.plates.length < rack.max_position
    );
    setRackId(rackForPlate?.id);
  };

  const getRackPosition = (e) => {
    e.preventDefault();
    if (rackId) {
      const rackPositionList = Object.keys(
        racks[rackId]["plates_and_positions"]
      ).map((position) => parseInt(position));
      const firstEmptyPosition = findMissingNumber(rackPositionList, 0, 25);
      if (firstEmptyPosition < parseInt(racks[rackId]["max_position"])) {
        setRackPosition(firstEmptyPosition);
      } else {
        alert(`Rack ${rackId} is full. Please choose new rack.`);
        setRackId("");
        setRackPosition("");
      }
    } else {
      getRackId(e);
    }
  };

  return (
    <form className={style.navbar__form} onSubmit={submitPlate}>
      <h3 className={style.form__header}>Editing Plate #{plate?.id}</h3>
      <div className={style.property}>
        <label htmlFor="rack_id" className={style.property__label}>
          Rack ID:
        </label>
        <input
          className={`${style.property__field} ${style["property__field-small"]}`}
          value={rackId}
          onChange={(e) => setRackId(e.target.value)}
          type="number"
          placeholder="Enter ID"
        />
        <button onClick={getRackId} className={style.sidebar__button}>
          Get ID
        </button>
      </div>
      <div className={style.property}>
        <label htmlFor="rack_position_id" className={style.property__label}>
          Rack Position:{" "}
        </label>
        <input
          className={`${style.property__field} ${style["property__field-small"]}`}
          value={rackPosition}
          onChange={(e) => setRackPosition(e.target.value)}
          type="number"
          placeholder="Enter ID"
        />
        <button onClick={getRackPosition} className={style.sidebar__button}>
          Get ID
        </button>
      </div>
      <div className={style.property}>
        <label htmlFor="max_well" className={style.property__label}>
          Maximum wells:
        </label>
        <input
          className={style.property__field}
          value={maxWell}
          onChange={(e) => setMaxWell(e.target.value)}
          type="number"
          placeholder="Enter max wells"
        />
      </div>
      <div className={style.property}>
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
      <div className={style.property}>
        <label htmlFor="thaw_count" className={style.property__label}>
          Thaw Count:{" "}
        </label>
        <input
          className={style.property__field}
          value={thawCount}
          onChange={(e) => setThawCount(e.target.value)}
          type="number"
          placeholder="Enter times sample was thawed"
        />
      </div>
      <div className={style.property}>
        <label htmlFor="discarded" className={style.property__label}>
          Plate Discarded:{" "}
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

export default PlateEdit;
