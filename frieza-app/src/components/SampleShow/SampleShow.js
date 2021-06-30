import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./SampleShow.module.css";
import { getSamples } from "../../store/sample";
import Sample from "../Sample/Sample";

function SampleShow() {
  const dispatch = useDispatch();
  const stateSamples = useSelector((state) => state.samples.byId);
  // console.log("\n\nState samples byId:", stateSamples);
  
  useEffect(() => {
    dispatch(getSamples());
  }, [dispatch]);

  const samples = Object.values(stateSamples).map((sample) => {
    return <Sample sampleId={sample.id} key={sample.id} />;
  });

  return (
    <div className={style.samples}>
      <h1>Hello, samples</h1>
      <h3>Samples go here</h3>
      {samples}
    </div>
  );
}

export default SampleShow;
