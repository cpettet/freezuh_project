import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import style from "./FreezerZoom.module.css";
import { getFreezers } from "../../store/freezer";

function FreezerZoom() {
  const { freezerId } = useParams();
  const [activePosition, setActivePosition] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const freezer = useSelector((state) => state.freezers.byId[freezerId]);
  const numRows = 5;
  const numCols = 5;

  useEffect(() => {
    dispatch(getFreezers());
    if (!freezer) history.push("/")
  }, [dispatch, freezer, history]);

  useEffect(() => {
    // Redirect sidebar component to position-filling interface
    if (parseInt(activePosition) >= 0) {
      history.push(`/freezers/${freezerId}/freezer-position-${activePosition}`);
    } else {
      return;
    }
  }, [history, freezerId, activePosition]);

  function getItemClassName(freezerPosition) {
    let itemClass = `${style.inner}`;
    if (
      freezer &&
      Object.keys(freezer?.racks_and_positions).includes(
        (freezerPosition + 1).toString()
      )
    ) {
      itemClass += ` ${style.filled}`;
    } else {
      itemClass += ` ${style.empty}`;
    }
    if (freezerPosition === parseInt(activePosition)) {
      itemClass += ` ${style["inner-active"]}`;
    }
    return itemClass;
  }

  function rackInFreezer(freezerPosition) {
    if (freezer?.racks_and_positions[freezerPosition + 1] !== undefined) {
      return `/racks/${freezer?.racks_and_positions[freezerPosition + 1]}`;
    } else {
      return `/freezers/${freezerId}`;
    }
  }

  function makePositionActive(e) {
    setActivePosition(parseInt(e.target.id));
    console.log(e.target.id);
  }

  function freezerBody() {
    const cols = [];
    for (let row = 0; row < numRows; row++) {
      const cellsInCol = [];
      for (let col = 0; col < numCols; col++) {
        const freezerPosition = col * 5 + row;
        cellsInCol.push(
          <Link
            id={freezerPosition}
            key={freezerPosition}
            to={rackInFreezer(freezerPosition)}
            onClick={makePositionActive}
          >
            <div className={style.item}>
              <div
                className={getItemClassName(freezerPosition)}
                id={freezerPosition}
              >
                {freezer?.racks_and_positions[
                  (parseInt(freezerPosition) + 1).toString()
                ] !== undefined
                  ? `${
                      freezer?.racks_and_positions[
                        (parseInt(freezerPosition) + 1).toString()
                      ]
                    }`
                  : ""}
              </div>
            </div>
          </Link>
        );
      }
      cols.push(
        <div className={style.row} key={row}>
          {cellsInCol}
        </div>
      );
    }
    return cols;
  }

  return (
    <div className={style.freezer__container}>
      <Link to="/freezers">Return to all freezers</Link>
      <span>{" > "}</span>
      <Link to={`/freezers/${freezerId}`}>
        {" "}
        <span onClick={(e) => setActivePosition("")}>Freezer </span>
        {freezerId}
      </Link>
      <div className={style.freezer}>
        <div className={style["display-housing"]}>
          <div
            className={`${style["display-housing__first"]} ${style.first}`}
          ></div>
          <div
            className={`${style["display-housing__second"]} ${style.second}`}
          >
            <div className={style.display}>
              <span className={style.display__id__text}>ID:</span>
              <span className={style.display__id__number}>{freezerId}</span>
            </div>
          </div>
          <div
            className={`${style["display-housing__third"]} ${style.third}`}
          ></div>
        </div>
        <div className={style.door}>{freezerBody()}</div>
        <div className={style.feet}>
          <div className={`${style.foot} ${style.foot__left}`}></div>
          <div className={`${style.foot} ${style.foot__right}`}></div>
        </div>
      </div>
    </div>
  );
}

export default FreezerZoom;
