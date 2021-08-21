import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import style from "../Show.module.css";
import { deleteRack } from "../../../../store/rack";

function SidebarRackShow() {
  const { rackId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const rack = useSelector((state) => state.racks.byId[rackId]);
  const [errors, setErrors] = useState([]);

  const onDelete = async (e) => {
    setErrors([]);
    e.preventDefault();
    const deletedRack = await dispatch(deleteRack(rack));
    console.log("Deleted rack:", deletedRack)
    if (deletedRack.errors) setErrors([deletedRack.errors]);
  };

  const onEdit = (e) => {
    setErrors([]);
    e.preventDefault();
    history.push(`/racks/${rackId}/edit`);
  };

  return (
    <div className={style.sidebar__container}>
      <h3 className={style.sidebar__header}>
        Rack {rackId}:{" "}
        {rack?.discarded ? (
          <span className={style["sidebar__header-inactive"]}>DISCARDED</span>
        ) : rack?.freezer_position !== "N/A" ? (
          <span className={style["sidebar__header-active"]}>STORED</span>
        ) : (
          <span className={style["sidebar__header-neutral"]}>NOT STORED</span>
        )}
      </h3>
      <div className={style.errors}>
        {errors?.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>
      <div className={style.property}>
        <div className={style.property__key}>Stored in freezer:</div>
        <div className={style.property__value}>{rack?.freezer_id}</div>
      </div>
      <div className={style.property}>
        <div className={style.property__key}>Stored in position:</div>
        <div className={style.property__value}>{rack?.freezer_position}</div>
      </div>
      <div className={style.properties}>
        <div className={style.property}>
          <div className={style.property__key}>Max plates:</div>
          <div className={style.property__value}>{rack?.max_position}</div>
        </div>
        <div className={style.property}>
          <div className={style.property__key}>Plates stored:</div>
          <div className={style.property__value}>
            {rack && rack.plates && rack.plates.join(", ")}
            {rack && rack.plates.length === 0 && "none"}
          </div>
        </div>
      </div>
      <div className={style.sidebar__buttons}>
        <button
          onClick={onEdit}
          className={`${style.sidebar__buttons__edit} ${style.sidebar__buttons__button}`}
        >
          Edit Properties
        </button>
        <button
          onClick={onDelete}
          className={`${style.sidebar__buttons__delete} ${style.sidebar__buttons__button}`}
        >
          Deactivate
        </button>
      </div>
    </div>
  );
}

export default SidebarRackShow;
