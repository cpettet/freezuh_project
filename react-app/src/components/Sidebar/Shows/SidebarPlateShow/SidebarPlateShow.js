import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import style from "./SidebarPlateShow.module.css"
import { deletePlate } from "../../../../store/plate";

function SidebarPlateShow() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { plateId } = useParams();
  const plate = useSelector(state => state.plates.byId[plateId]);

  const onDelete = e => {
    e.preventDefault();
    dispatch(deletePlate(plate));
  }

  const onEdit = e => {
    e.preventDefault();
    history.push(`/plates/${plateId}/edit`);
  }

  return <div className={style.sidebar__plate}>
    {plate && plate.discarded && <h1>Plate has been discarded</h1>}
    <h2>Plate number: {plateId}</h2>
    {plate && Object.keys(plate).map(key => (
      <div key={key}>
        {key}: {String(plate[key])}
      </div>
    ))}
    <div className={style.sidebar__buttons}>
      <button onClick={onEdit}>Edit Plate</button>
      <button onClick={onDelete}>Discard Plate</button>
    </div>
  </div>;
}

export default SidebarPlateShow;