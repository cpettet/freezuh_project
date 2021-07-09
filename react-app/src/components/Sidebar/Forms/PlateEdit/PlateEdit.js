import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { editPlate, getPlates } from "../../../../store/plate";
import getInputDateTime from "../../../../utils/getInputDateTime";

function PlateEdit() {
  const { plateId } = useParams();
  const plate = useSelector((state) => state.plates.byId[plateId]);
  const history = useHistory();
  const dispatch = useDispatch();

  const [rackId, setRackId] = useState(plate?.rack_id);
  const [thawCount, setThawCount] = useState(plate?.thaw_count);
  const [storeDate, setStoreDate] = useState(
    getInputDateTime(plate?.store_date)
  );
  const [discarded, setDiscarded] = useState(plate?.discarded);
  const [maxWell, setMaxWell] = useState(plate?.max_well);

  useEffect(() => {
    dispatch(getPlates())
  }, [dispatch])

  const submitPlate = async (e) => {
    e.preventDefault();
    await dispatch(
      editPlate({
        id: plate?.id,
        rack_id: rackId,
        thaw_count: thawCount,
        store_date: storeDate,
        discarded: discarded,
        max_well: maxWell,
      })
    );
    history.push(`/plates/${plateId}`);
  };

  const getFirstOpenRackPosition = (e) => {
    e.preventDefault();
    // TODO: populate with first available position
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
        <button onClick={getFirstOpenRackPosition} className={style.sidebar__button}>Get Rack ID</button>
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
      <button className={style.sidebar__button} type="submit">Submit Changes</button>
    </form>
  );
}

export default PlateEdit;
