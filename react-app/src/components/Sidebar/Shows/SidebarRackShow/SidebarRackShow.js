import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import style from "./SidebarRackShow.module.css";
import { deleteRack } from "../../../../store/rack";

function SidebarRackShow() {
  const { rackId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const rack = useSelector((state) => state.racks.byId[rackId]);

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteRack(rack));
  };

  const onEdit = (e) => {
    e.preventDefault();
    history.push(`/racks/${rackId}/edit`);
  };

  return (
    <div className={style.sidebar__rack}>
      {rack && rack.discarded && <h1>Rack has been discarded</h1>}
      <h2>Rack number: {rackId}</h2>
      {rack &&
        Object.keys(rack).map((key) => (
          <div key={key}>
            {key}: {String(rack[key])}
          </div>
        ))}
      <div className={style.sidebar__buttons}>
        <button onClick={onEdit}>Edit Rack</button>
        <button onClick={onDelete}>Discard Rack</button>
      </div>
    </div>
  );
}

export default SidebarRackShow;
