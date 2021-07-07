import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import style from "./FreezerForm.module.css";
import { createFreezer } from "../../../../store/freezer";

function FreezerForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [maxPosition, setMaxPosition] = useState(25);
  const [active, setActive] = useState(true);

  const submitFreezer = async (e) => {
    e.preventDefault();
    const newFreezer = await dispatch(
      createFreezer({
        ...(maxPosition && { max_position: maxPosition }),
        active: active,
      })
    );
    const newFreezerId = newFreezer.freezer.id;
    history.push(`/freezers/${newFreezerId}`);
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
      <button type="submit">Create Freezer</button>
    </form>
  );
}

export default FreezerForm;
