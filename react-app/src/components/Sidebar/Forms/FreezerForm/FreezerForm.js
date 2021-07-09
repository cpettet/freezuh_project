import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import style from "../Form.module.css";
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
      <h3 className={style.form__header}>Creating new freezer</h3>
      <div className={style.property}>
        <label htmlFor="max_position" className={style.property__label}>
          Max positions:{" "}
        </label>
        <input
          className={style.property__field}
          value={maxPosition}
          onChange={(e) => setMaxPosition(e.target.value)}
          type="number"
          placeholder="Enter max positions in freezer"
          min="1"
        />
      </div>
      <div>
        <label htmlFor="active" className={style.property__label}>
          Freezer Active:{" "}
        </label>
        <label>
          <input
            className={style.property__field}
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
            className={style.property__field}
            type="radio"
            name="active"
            value="false"
            checked={active === false}
            onChange={() => setActive(false)}
          />
          No
        </label>
      </div>
      <button type="submit" className={style.sidebar__button}>
        Create Freezer
      </button>
    </form>
  );
}

export default FreezerForm;
