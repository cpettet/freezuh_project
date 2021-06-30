import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./SampleShow.module.css";
import { getSamples } from "../../store/sample";
import Sample from "../Sample";

function SampleShow() {
  const dispatch = useDispatch();
  const stateSamples = useSelector((state) => Object.values(state.samples.byId));

  useEffect(() => {
    dispatch(getSamples());
  }, [dispatch]);

  const samples = stateSamples.map((sample) => {
    return (
        <Sample key={sample} sample={sample} />
    );
  });

  return (
    <div className={style.samples}>
      <h1>Hello, samples</h1>
      <h3>Samples go here</h3>
      <Link to="/samples/new">New Sample</Link>
      {samples}
    </div>
  );
}

export default SampleShow;
