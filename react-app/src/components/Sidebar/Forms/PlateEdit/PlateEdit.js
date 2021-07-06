import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "./PlateEdit.module.css";
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
      <h3>Editing Plate #{plate?.id}</h3>
      <div>
        <label htmlFor="rack_id">Rack ID:</label>
        <input
          value={rackId}
          onChange={(e) => setRackId(e.target.value)}
          type="number"
          placeholder="Enter rack Id"
        />
      </div>
      <div>
        <label htmlFor="max_well">Maximum number of wells:</label>
        <input
          value={maxWell}
          onChange={(e) => setMaxWell(e.target.value)}
          type="number"
          placeholder="Enter max wells"
        />
      </div>
      <button onClick={getFirstOpenRackPosition}>Populate Rack ID</button>
      <div>
        <label htmlFor="store_date">Storage Date:</label>
        <input
          type="datetime-local"
          value={storeDate}
          onChange={(e) => setStoreDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="thaw_count">Thaw Count: </label>
        <input
          value={thawCount}
          onChange={(e) => setThawCount(e.target.value)}
          type="number"
          placeholder="Enter times sample was thawed"
        />
      </div>
      <div>
        <label htmlFor="discarded">Sample Discarded: </label>
        <label>
          <input
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
            type="radio"
            name="discarded"
            value="false"
            checked={discarded === false}
            onChange={() => setDiscarded(false)}
          />
          No
        </label>
      </div>
      <button type="submit">Submit Changes</button>
    </form>
  );
}

export default PlateEdit;
