import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import style from "../Show.module.css";
import { deletePlate } from "../../../../store/plate";

function SidebarPlateShow() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { plateId } = useParams();
  const plate = useSelector((state) => state.plates.byId[plateId]);

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deletePlate(plate));
  };

  const onEdit = (e) => {
    e.preventDefault();
    history.push(`/plates/${plateId}/edit`);
  };

  return (
    <div className={style.sidebar__container}>
      <h3 className={style.sidebar__header}>
        Plate {plateId}:{" "}
        {!plate?.discarded ? (
          <span className={style["sidebar__header-active"]}>STORED</span>
        ) : (
          <span className={style["sidebar__header-inactive"]}>DISCARDED</span>
        )}
      </h3>
      <div className={style.properties}>
        <div className={style.property}>
          <div className={style.property__key}>Max samples:</div>
          <div className={style.property__value}>{plate?.max_well}</div>
        </div>
        <div className={style.property}>
          <div className={style.property__key}>Stored in rack:</div>
          <div className={style.property__value}>{plate?.rack_id}</div>
        </div>
        <div className={style.property}>
          <div className={style.property__key}>Stored on:</div>
          <div className={style.property__value}>{plate?.store_date}</div>
        </div>
        <div className={style.property}>
          <div className={style.property__key}>Position in rack:</div>
          <div className={style.property__value}>{plate?.rack_position}</div>
        </div>
        <div className={style.property}>
          <div className={style.property__key}>Samples stored:</div>
          <div className={style.property__value}>
            {plate && plate.samples && plate.samples.join(", ")}
            {plate && plate.samples.length === 0 && "none"}
          </div>
        </div>
        <div className={style.property}>
          <div className={style.property__key}>Times thawed:</div>
          <div className={style.property__value}>{plate?.thaw_count}</div>
        </div>
      </div>
      <div className={style.sidebar__buttons}>
        <button
          onClick={onEdit}
          className={`${style.sidebar__buttons__edit} ${style.sidebar__buttons__button}`}
        >
          {" "}
          Edit Properties
        </button>
        <button
          onClick={onDelete}
          className={`${style.sidebar__buttons__delete} ${style.sidebar__buttons__button}`}
        >
          {" "}
          Discard
        </button>
      </div>
    </div>
  );
}

export default SidebarPlateShow;
