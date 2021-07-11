import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import style from "./FreezerZoom.module.css";
import { getFreezers } from "../../store/freezer";

function FreezerZoom() {
  const { freezerId } = useParams();
  const dispatch = useDispatch();
  const freezer = useSelector((state) => state.freezers.byId[freezerId]);
  const numRows = 5;
  const numCols = 5;

  useEffect(() => {
    dispatch(getFreezers());
  }, [dispatch]);

  function getItemClassName(freezerPosition) {
    if (freezer?.racks[freezerPosition]) {
      return `${style.inner} ${style.filled}`;
    } else {
      return `${style.inner} ${style.empty}`;
    }
  }

  function getItemLink(freezerPosition) {
    if (freezer?.racks[freezerPosition]) {
      return `/racks/${freezer?.racks[freezerPosition]}`;
    } else {
      return `/freezers/${freezerId}`;
    }
  }

  function freezerBody() {
    const cols = [];
    for (let row = 0; row < numRows; row++) {
      const cellsInCol = [];
      for (let col = 0; col < numCols; col++) {
        const freezerPosition = col * 5 + row;
        cellsInCol.push(
          <Link key={freezerPosition} to={getItemLink(freezerPosition)}>
            <div className={style.item}>
              <div className={getItemClassName(freezerPosition)}>
                {freezer?.racks[freezerPosition]}
              </div>
            </div>
          </Link>
        );
      }
      cols.push(<div className={style.row} key={row}>{cellsInCol}</div>);
    }
    return cols;
  }

  return (
    <div>
      <Link to="/freezers">Return to all freezers</Link>
      <div className={style.freezer}>
        <div className={style["display-housing"]}>
          <div
            className={`${style["display-housing__first"]} ${style.first}`}
          ></div>
          <div className={`${style["display-housing__second"]} ${style.second}`}>
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
