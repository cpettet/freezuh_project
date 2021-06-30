import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./SidebarSampleShow.module.css";

function SidebarSampleShow() {
  const { sampleId } = useParams();
  const sample = useSelector(state => state.samples.byId[sampleId])

  return (
    <div className={style.sidebar__sample}>
      <h2>Sample number: {sampleId}</h2>
      {sample && Object.keys(sample).map(key => (
        <div key={key}>
          {key}: {sample[key]}
        </div>
      ))}
    </div>
  );
}

export default SidebarSampleShow;
