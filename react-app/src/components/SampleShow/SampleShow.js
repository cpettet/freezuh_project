import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./SampleShow.module.css";
import { getSamples } from "../../store/sample";
import Sample from "../Sample";
import newSampleIcon from "./Sample-Tube-NEW.min.svg"

function SampleShow() {
  const dispatch = useDispatch();
  const stateSamples = useSelector((state) =>
    Object.values(state.samples.byId)
  );

  useEffect(() => {
    dispatch(getSamples());
  }, [dispatch]);

  const samples = stateSamples.map((sample) => {
    return <Sample key={sample.id} sample={sample} />;
  });

  return (
    <div className={style.samples}>
      <Link to="/samples/new">
        <img src={newSampleIcon} alt="new sample" className={style["new-sample__icon"]}/>
      </Link>
      {samples}
    </div>
  );
}

export default SampleShow;
