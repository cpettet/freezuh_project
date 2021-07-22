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

  useEffect(() => {
    // Redirect sidebar component to position-filling interface
    if (parseInt(activePosition) >= 0) {
      history.push(`/racks/${rackId}/rack-position-${activePosition}`);
    } else {
      return;
    }
  }, [history, rackId, activePosition]);

  function getItemClassName(rackPosition) {
    let itemClass = `${style.inner}`;
    if (
      rack &&
      Object.keys(rack?.plates_and_positions).includes(
        (rackPosition + 1).toString()
        )
        ) {
          itemClass += ` ${style.filled}`
        } else {
          itemClass += ` ${style.empty}`;
        }
    if (rackPosition === parseInt(activePosition)) itemClass += ` ${style["inner-active"]}`
    return itemClass
  }

  function plateInRack(rackPosition) {
    if (rack?.plates_and_positions[rackPosition + 1] !== undefined) {
      return `/plates/${rack?.plates_and_positions[rackPosition + 1]}`;
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
          <Link
            id={rackPosition}
            key={rackPosition}
            to={plateInRack(rackPosition)}
            onClick={(e) => makePositionActive(e)}
          >
            <div className={style.item} key={rackPosition}>
              <div
                id={rackPosition}
                key={rackPosition}
                className={getItemClassName(rackPosition)}
              >
                {rack?.plates_and_positions[
                  (parseInt(rackPosition) + 1).toString()
                ] !== undefined
                  ? `${
                      rack?.plates_and_positions[
                        (parseInt(rackPosition) + 1).toString()
                      ]
                    }`
                  : ""}
              </div>
            </div>
          </Link>
        );
      }
      rows.push(
        <div className={style.column} key={col}>
          {cellsInRow}
        </div>
      );
    }
    return rows;
  }

  function makePositionActive(e) {
    e.preventDefault();
    setActivePosition(parseInt(e.target.id));
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
