import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./SidebarSampleShow.module.css";
import { deleteSample } from "../../../../store/sample";

function SidebarSampleShow() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sampleId } = useParams();
  const sample = useSelector(state => state.samples.byId[sampleId])

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSample(sample));
  }

  const onEdit = (e) => {
    e.preventDefault();
    history.push(`/samples/${sampleId}/edit`);
  }

  return (
    <div className={style.sidebar__sample}>
      {sample.discarded}
      <h2>Sample number: {sampleId}</h2>
      {sample && Object.keys(sample).map(key => (
        <div key={key}>
          {key}: {String(sample[key])}
        </div>
      ))}
      <div className={style.sidebar__buttons}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default SidebarSampleShow;
