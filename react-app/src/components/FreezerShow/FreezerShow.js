import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "../Item.module.css";
import { getFreezers } from "../../store/freezer";
import Freezer from "../Freezer";
import newFreezerIcon from "./Freezer-Final-NEW.min.svg";

function FreezerShow() {
  const dispatch = useDispatch();
  const stateFreezers = useSelector((state) =>
    Object.values(state.freezers.byId)
  );

  useEffect(() => {
    dispatch(getFreezers());
  }, [dispatch]);

  const freezers = stateFreezers.map((freezer) => {
    return (
      <div className={style.item}>
        <Freezer key={freezer.id} freezer={freezer} />
      </div>
    );
  });

  return (
    <div className={style.items}>
      <div className={style.item}>
        <Link to="/freezers/new" className={style.item__link}>
          <img
            className={style["new-item__icon"]}
            src={newFreezerIcon}
            alt="create new freezer"
          />
          <p className={style.item__text}>NEW</p>
        </Link>
      </div>
      {freezers}
    </div>
  );
}

export default FreezerShow;
