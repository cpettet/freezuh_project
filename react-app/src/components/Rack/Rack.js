import React from "react";
import { Link } from "react-router-dom";
import style from "../Item.module.css";
import image from "./Rack-Final.min.svg"

function Rack({ rack }) {
  return (
    <>
      <Link to={`/racks/${rack.id}`} className={style.item__link}>
        <img
          className={style.item__icon}
          src={image}
          alt={`Rack # ${rack.id}`}
        />
        <p className={style.item__text}>{rack.id}</p>
      </Link>
    </>
  );
}

export default Rack;