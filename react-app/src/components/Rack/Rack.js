import React from "react";
import { Link } from "react-router-dom";
import style from "./Rack.module.css";
import image from "./Rack.min.svg"

function Rack({ rack }) {
  return (
    <div className={style.rack}>
      <Link to={`/racks/${rack.id}`}>
        <img src={image} alt={`Rack # ${rack.id}`} className={style.rack__icon}/>
        <p className={style.rack__text}>Rack # {rack.id}</p>
      </Link>
    </div>
  )
}

export default Rack;