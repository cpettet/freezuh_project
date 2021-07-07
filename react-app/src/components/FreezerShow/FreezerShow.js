import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./FreezerShow.module.css";
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
    return <Freezer key={freezer.id} freezer={freezer} />;
  });

  return (
    <div className={style.freezers}>
      <Link to="/freezers/new">
        <img
          src={newFreezerIcon}
          alt="create new freezer"
          className={style["new-freezer__icon"]}
        />
      </Link>
      {freezers}
    </div>
  );
}

export default FreezerShow;
