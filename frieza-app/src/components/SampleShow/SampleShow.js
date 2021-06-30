import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./SampleShow.module.css";
import { getSamples } from "../../store/sample";
import Sample from "../Sample";

function SampleShow() {
  const dispatch = useDispatch();
  const stateSamples = useSelector((state) => state.samples.allIds);
  console.log("\n\nState samples byId:", stateSamples);
  // debugger;
  useEffect(() => {
    dispatch(getSamples());
  }, [dispatch]);

  return (
    <div className={style.samples}>
      <h1>Hello, samples</h1>
      <h3>Samples go here</h3>
      {stateSamples &&
        stateSamples.map((sampleId) => {
          console.log("Iterating over samples");
          return <Sample key={sampleId} sampleId={sampleId} />;
        })}
    </div>
  );
}

export default SampleShow;
