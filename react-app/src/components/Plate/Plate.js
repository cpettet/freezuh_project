import React from "react";
import { Link } from "react-router-dom";
import style from "../Item.module.css";
import image from "./Plate-Finalv2.min.svg";

function Plate({ plate }) {
  return (
    <>
      <Link to={`/plates/${plate.id}`} className={style.item__link}>
        <img src={image} alt={plate.id} className={style.item__icon} />
        <p className={style.item__text}>{plate.id}</p>
      </Link>
    </>
  );
}

export default Plate;
