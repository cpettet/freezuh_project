import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import style from "../Show.module.css";
import { deleteFreezer } from "../../../../store/freezer";

function SidebarFreezerShow() {
  const { freezerId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const freezer = useSelector((state) => state.freezers.byId[freezerId]);

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteFreezer(freezer));
  };

  const onEdit = (e) => {
    e.preventDefault();
    history.push(`/freezers/${freezerId}/edit`);
  };

  return (
    <div className={style.sidebar__container}>
      <h3 className={style.sidebar__header}>
        Freezer {freezerId}:{" "}
        {freezer?.active ? (
          <span className={style["sidebar__header-active"]}>ACTIVE</span>
        ) : (
          <span className={style["sidebar__header-inactive"]}>INACTIVE</span>
        )}
      </h3>
      <div className={style.properties}>
        <div className={style.property}>
          <div className={style.property__key}>Max racks:</div>
          <div className={style.property__value}>{freezer?.max_position}</div>
        </div>
        <div className={style.property}>
          <div className={style.property__key}>Racks stored:</div>
          <div className={style.property__value}>
            {freezer && freezer.racks && freezer.racks.join(", ")}
            {freezer && freezer.racks.length === 0 && "none"}
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

export default SidebarFreezerShow;
