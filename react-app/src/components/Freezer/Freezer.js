import React from "react";
import { Link } from "react-router-dom";
import style from "./Freezer.module.css";
import image from "./Freezer-Final.min.svg";

function Freezer({ freezer }) {
  return (
    <div>
      <Link to={`/freezers/${freezer.id}`}>
        <img
          src={image}
          alt={`Freezer #${freezer.id}`}
          className={style.freezer__icon}
        />
        <p className={style.freezer__text}>FZR #{freezer.id}</p>
      </Link>
    </div>
  );
}

export default Freezer;
