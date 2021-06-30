import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Sample.module.css";
import image from "./Sample-Tube.min.svg"

function Sample({sampleId}) {
  const dispatch = useDispatch();
  const sample = useSelector(state => state.samples.byId[sampleId]);
  console.log("Inside the sample", sampleId)

  return (
    <div className={style.sample}>
      <img src={image} alt={sampleId} className={style.sample__icon}/>
      <p>{sample.id}</p>
    </div>
  )
}

export default Sample;
