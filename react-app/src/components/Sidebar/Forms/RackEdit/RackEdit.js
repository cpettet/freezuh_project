import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "./RackEdit.module.css";
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
      <h3>Editing Rack #{rack?.id}</h3>
      <div>
        <label htmlFor="freezer_id">Freezer ID:</label>
        <input
          value={freezerId}
          onChange={(e) => setFreezerId(e.target.value)}
          type="number"
          placeholder="Enter freezer Id"
        />
      </div>
      <div>
        <label htmlFor="max_position">Maximum number of positions:</label>
        <input
          value={maxPosition}
          onChange={(e) => setMaxPosition(e.target.value)}
          type="number"
          placeholder="Enter max positions on rack"
        />
      </div>
      <div>
        <label htmlFor="discarded">Rack Discarded: </label>
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

export default RackEdit;
