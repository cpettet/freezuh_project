import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
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
      <h3 className={style.form__header}>Editing Freezer #{freezer?.id}</h3>
      <div className={style.property}>
        <label htmlFor="max_position" className={style.property__label}>
          Max positions:{" "}
        </label>
        <input
          className={style.property__field}
          value={maxPosition}
          onChange={(e) => setMaxPosition(e.target.value)}
          type="number"
          placeholder="Max racks in freezer"
          min="1"
        />
      </div>
      <div className={style.property}>
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
      <button className={style.sidebar__button} type="submit">
        Submit Changes
      </button>
    </form>
  );
}

export default FreezerEdit;