import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import style from "./SidebarFreezerShow.module.css";
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
    <div className={style.sidebar__freezer}>
      {freezer && !freezer.active && <h1>Freezer is inactive</h1>}
      <h2>Freezer number: {freezerId}</h2>
      {freezer &&
        Object.keys(freezer).map((key) => (
          <div key={key}>
            {key}: {String(freezer[key])}
          </div>
        ))}
      <div className={style.sidebar__buttons}>
        <button onClick={onEdit}>Edit Freezer</button>
        <button onClick={onDelete}>Disable Freezer</button>
      </div>
    </div>
  );
}

export default SidebarFreezerShow;
