import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "../Item.module.css";
import { getSamples } from "../../store/sample";
import Sample from "../Sample";
import newSampleIcon from "./Sample-Tube-NEW.min.svg";

function SampleShow() {
  const dispatch = useDispatch();
  const stateSamples = useSelector((state) =>
    Object.values(state.samples.byId)
  );

  useEffect(() => {
    dispatch(getSamples());
  }, [dispatch]);

  const samples = stateSamples.map((sample) => {
    return (
      <div className={style.item} key={sample.id}>
        <Sample sample={sample} />
      </div>
    );
  });

  return (
    <div className={style.items}>
      <div className={style.item}>
        <Link to="/samples/new" className={style.item__link}>
          <img
            className={style["new-item__icon"]}
            src={newSampleIcon}
            alt="new sample"
          />
          <p className={style.item__text}>NEW</p>
        </Link>
      </div>
      {samples}
    </div>
  );
}

export default SampleShow;
