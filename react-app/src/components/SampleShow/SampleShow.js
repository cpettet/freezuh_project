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
      <Sample key={sample.id} sample={sample} />
    );
  });

  return (
    <div className={style.samples}>
      <Link to="/samples/new">New Sample</Link>
      {samples}
    </div>
  );
}

export default SampleShow;
