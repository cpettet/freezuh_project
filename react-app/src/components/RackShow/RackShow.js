import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "../Item.module.css";
import { getRacks } from "../../store/rack";
import Rack from "../Rack";
import newRackIcon from "./Rack-NEW.min.svg";

function Racks() {
  const dispatch = useDispatch();
  const stateRacks = useSelector((state) => Object.values(state.racks.byId));

  useEffect(() => {
    dispatch(getRacks());
  }, [dispatch]);

  const racks = stateRacks.map((rack) => {
    return (
      <div className={style.item} key={rack.id}>
        <Rack key={rack.id} rack={rack} />
      </div>
    );
  });

  return (
    <div className={style.items}>
      <div className={style.item}>
        <Link to="/racks/new" className={style.item__link}>
          <img
            className={style["new-item__icon"]}
            src={newRackIcon}
            alt="create new rack"
          />
          <p className={style.item__text}>NEW</p>
        </Link>
      </div>
      {racks}
    </div>
  );
}

export default Racks;
