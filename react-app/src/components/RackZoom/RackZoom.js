import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import style from "./RackZoom.module.css";
import { getRacks } from "../../store/rack";

function RackZoom() {
  const { rackId } = useParams();
  const [activePosition, setActivePosition] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const rack = useSelector((state) => state.racks.byId[rackId]);
  const numRows = 5;
  const numCols = 5;

  useEffect(() => {
    dispatch(getRacks());
  }, [dispatch]);

  function getItemClassName(rackPosition) {
    if (rack?.plates[rackPosition]) {
      return `${style.inner} ${style.filled}`;
    } else {
      return `${style.inner} ${style.empty}`;
    }
  }

  function getItemLink(rackPosition) {
    if (rack?.plates[rackPosition]) {
      return `/plates/${rack?.plates[rackPosition]}`;
    } else {
      return `/racks/${rackId}`;
    }
  }

  function rackBody() {
    const rows = [];
    for (let col = 0; col < numCols; col++) {
      const cellsInRow = [];
      for (let row = 0; row < numRows; row++) {
        const rackPosition = row + col * 5;
        cellsInRow.push(
          <Link key={rackPosition} to={getItemLink(rackPosition)}>
            <div className={style.item}>
              <div className={getItemClassName(rackPosition)}>
                {rack?.plates[rackPosition]}
              </div>
            </div>
          </Link>
        );
      }
      rows.push(<div className={style.column}>{cellsInRow}</div>);
    }
    return rows;
  }

  return (
    <div>
      <Link to="/racks">All racks</Link>
      <span>{" > "}</span>
      <Link to={`/racks/${rackId}`}>
        <span onClick={(e) => setActivePosition("")}>Rack </span>
        {rackId}
      </Link>
      <div className={style.rack}>
        <div className={style["rack__top-handles"]}>
          <div
            className={`${style.handle} ${style.handle__top} ${style.handle__1}`}
          >
            A
          </div>
          <div
            className={`${style.handle} ${style.handle__top} ${style.handle__2}`}
          >
            B
          </div>
          <div
            className={`${style.handle} ${style.handle__top} ${style.handle__3}`}
          >
            C
          </div>
          <div
            className={`${style.handle} ${style.handle__top} ${style.handle__4}`}
          >
            D
          </div>
          <div
            className={`${style.handle} ${style.handle__top} ${style.handle__5}`}
          >
            E
          </div>
        </div>
        <div className={style.rack__main}>
          <div className={`${style.handle} ${style.handle__left}`}></div>
          {rackBody()}
          <div className={`${style.handle} ${style.handle__right}`}></div>
        </div>
      </div>
    </div>
  );
}

export default RackZoom;
