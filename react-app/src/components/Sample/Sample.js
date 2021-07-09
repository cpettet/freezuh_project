import React from "react";
import { Link } from "react-router-dom";
import style from "../Item.module.css";
import image from "./Sample-Tube-Final.min.svg";

function Sample({ sample }) {
  return (
    <>
      <Link to={`/samples/${sample.id}`} className={style.item__link}>
        <img src={image} alt={sample.id} className={style.item__icon} />
        <p className={style.item__text}>{sample.id}</p>
      </Link>
    </>
  );
}

export default Sample;
