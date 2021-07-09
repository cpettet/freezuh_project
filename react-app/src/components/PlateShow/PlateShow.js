import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "../Item.module.css";
import { getPlates } from "../../store/plate";
import Plate from "../Plate";
import newIcon from "./Plate-Finalv2-NEW.min.svg";

function Plates() {
  const dispatch = useDispatch();
  const statePlates = useSelector((state) => Object.values(state.plates.byId));

  useEffect(() => {
    dispatch(getPlates());
  }, [dispatch]);

  const plates = statePlates.map((plate) => {
    return (
      <div className={style.item}>
        <Plate key={plate.id} plate={plate} />
      </div>
    );
  });

  return (
    <div className={style.items}>
      <div className={style.item}>
        <Link to="/plates/new" className={style.item__link}>
          <img
            className={style["new-item__icon"]}
            src={newIcon}
            alt={`create new plate`}
          />
          <p className={style.item__text}>NEW</p>
        </Link>
      </div>
      {plates}
    </div>
  );
}

export default Plates;
