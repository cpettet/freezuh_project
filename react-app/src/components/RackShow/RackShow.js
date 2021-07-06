import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./RackShow.module.css";
import { getRacks } from "../../store/rack";
import Rack from "../Rack/Rack";

function Racks() {
  const dispatch = useDispatch();
  const stateRacks = useSelector(state => Object.values(state.racks.byId));

  useEffect(() => {
    dispatch(getRacks());
  }, [dispatch]);

  const racks = stateRacks.map(rack => {
    return <Rack key={rack.id} rack={rack} />
  })

  return (
    <div className={style.racks}>
      <Link to="/racks/new">New Rack</Link>
      {racks}
    </div>
  );
}

export default Racks;
