import React from "react";
import { Link } from "react-router-dom";
import style from "./Sample.module.css";
import image from "./Sample-Tube-Final.min.svg";

function Sample({ sample }) {

  return (
    <div className={style.sample}>
      <Link to={`/samples/${sample.id}`}>
        <img src={image} alt={sample.id} className={style.sample__icon} />
        <p>{sample.id}</p>
      </Link>
    </div>
  );
}

export default Sample;
