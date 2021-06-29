import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Sample.module.css";
import image from "./Sample-Tube.min.svg"
import SampleShow from "../SampleShow";

function Sample({sampleId}) {
  const dispatch = useDispatch();
  const sample = useSelector(state => state.samples.byId[sampleId]);

  return (
    <div className={style.sample}>
      <img src={image} alt={`sampleId:${sampleId}`} />
    </div>
  )
}

export default Sample;