import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./PlateShow.module.css";
import { getPlates } from "../../store/plate";
import Plate from "../Plate/Plate";
import newIcon from "./Plate-Finalv2-NEW.min.svg"

function Plates() {
  const dispatch = useDispatch();
  const statePlates = useSelector((state) => Object.values(state.plates.byId));

  useEffect(() => {
    dispatch(getPlates());
  }, [dispatch]);

  const plates = statePlates.map(plate => {
      return <Plate key={plate.id} plate={plate} />;
  })

  return (
    <div className={style.plates}>
      <Link to="/plates/new"><img src={newIcon} alt={`create new plate`} className={style["new-plate__icon"]}/></Link>
      {plates}
    </div>
  );
}

export default Plates;
