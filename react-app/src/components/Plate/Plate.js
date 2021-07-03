import React from "react";
import { Link } from "react-router-dom";
import style from "./Plate.module.css";
import image from "./Plate-Final.min.svg"

function Plate({plateId}) {

  return (
    <div>
      <Link to={`/plates/${plateId}`}>
        <img src={image} alt={plateId} className={style.plate__image} />
        <p>Plate # {plateId}</p>
      </Link>
    </div>
  )
}

export default Plate;