import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "./FreezerEdit.module.css";
import { editFreezer, getFreezers } from "../../../../store/freezer";

function FreezerEdit() {
  const { freezerId } = useParams();
  const freezer = useSelector((state) => state.freezers.byId[freezerId]);
  const history = useHistory();
  const dispatch = useDispatch();

  const [maxPosition, setMaxPosition] = useState(freezer?.max_position);
  const [active, setActive] = useState(freezer?.active);

  useEffect(() => {
    dispatch(getFreezers());
  }, [dispatch]);

  const submitFreezer = async (e) => {
    e.preventDefault();
    await dispatch(
      editFreezer({
        id: freezer?.id,
        max_position: maxPosition,
        active: active,
      })
    );
    history.push(`/freezers/${freezerId}`);
  };

  return (
    <form className={style.navbar__form} onSubmit={submitFreezer}>
      <div>
        <label htmlFor="max_position">Max positions: </label>
        <input
          value={maxPosition}
          onChange={(e) => setMaxPosition(e.target.value)}
          type="number"
          placeholder="Enter max positions in freezer"
          min="1"
        />
      </div>
      <div>
        <label htmlFor="active">Freezer Active: </label>
        <label>
          <input
            type="radio"
            name="active"
            value="true"
            checked={active === true}
            onChange={() => setActive(true)}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="active"
            value="false"
            checked={active === false}
            onChange={() => setActive(false)}
          />
          No
        </label>
      </div>
      <button type="submit">Submit Changes</button>
    </form>
  );
}

export default FreezerEdit;