import React from "react";
import { useDispatch } from "react-redux";
import style from "./Sample.module.css";
import image from "./Sample-Tube.min.svg"

function Sample({sample}) {
  const dispatch = useDispatch();

  return (
    <div className={style.sample}>
      <img src={image} alt={sample.id} className={style.sample__icon}/>
      <p>{sample.id}</p>
    </div>
  )
}

export default Sample;
