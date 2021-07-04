import React from "react";
import { Link } from "react-router-dom";
import style from "./Plate.module.css";
import image from "./Plate-Final.min.svg";

function Plate({ plate }) {
  return (
    <div>
      <Link to={`/plates/${plate.id}`}>
        <img src={image} alt={plate.id} className={style.plate__icon} />
        <p>Plate # {plate.id}</p>
      </Link>
    </div>
  );
}

export default Plate;
