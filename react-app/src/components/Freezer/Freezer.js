import React from "react";
import { Link } from "react-router-dom";
import style from "../Item.module.css";
import image from "./Freezer-Final.min.svg";

function Freezer({ freezer }) {
  return (
    <>
      <Link to={`/freezers/${freezer.id}`} className={style.item__link}>
        <img
          src={image}
          alt={`Freezer #${freezer.id}`}
          className={style.item__icon}
        />
        <p className={style.item__text}>{freezer.id}</p>
      </Link>
    </>
  );
}

export default Freezer;
