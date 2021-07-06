import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import style from "./PlateZoom.module.css";
import { getPlates } from "../../store/plate";

function PlateZoom() {
  const { plateId } = useParams();
  const dispatch = useDispatch();
  const plate = useSelector((state) => state.plates.byId[plateId]);
  const numRows = 8;
  const numCols = 12;
  const rowNameConversion = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
  };

  useEffect(() => {
    dispatch(getPlates())
  }, [dispatch]);

  function classesForWell(wellNumber, colClass) {
    if (plate?.samples.length > wellNumber) {
      return `${style[colClass]} ${style.plate__header} ${style["plate__well-filled"]} ${style.plate__well}`;
    } else {
      return `${style[colClass]} ${style.plate__header} ${style["plate__well-empty"]} ${style.plate__well}`;
    }
  }

  function sampleInTable(wellNumber) {
    if (plate?.samples.length > wellNumber) {
      return `/samples/${plate.samples[wellNumber]}`;
    } else {
      return `/plates/${plateId}`;
    }
  }

  function tableBody() {
    const rows = [];
    for (let row = 0; row < numRows; row++) {
      const rowClass = `row-${row}`;
      const cellsInRow = [];
      for (let col = 0; col < numCols; col++) {
        const cellId = `cell-${row}:${col}`;
        const colClass = `col-${col}`;
        const wellNumber = row + col * 8;
        // Setting up the row header
        if (col === 0) {
          cellsInRow.push(
            <th
              scope="row"
              key={rowClass}
              className={`${style[rowClass]} ${style.plate__header} ${style.plate__header__row}`}
            >
              {rowNameConversion[row]}
            </th>
          );
        }
        cellsInRow.push(
          <td key={cellId} className={classesForWell(wellNumber, colClass)}>
            <Link to={sampleInTable(wellNumber)}>
              <div className={style["plate__well__inner"]}>
                {plate?.samples.length > wellNumber
                  ? `#: ${plate?.samples[wellNumber]}`
                  : ""}
              </div>
            </Link>
          </td>
        );
      }
      rows.push(
        <tr key={row} className={`${style.plate__row}`}>
          {cellsInRow}
        </tr>
      );
    }
    return rows;
  }

  return (
    <div>
      <Link to="/plates">Return to all plates</Link>
      <table className={style.plate}>
        <colgroup>
          <col span="12" className="row-names" />
          <col span="1" className="col-1" />
          <col span="1" className="col-2" />
          <col span="1" className="col-3" />
          <col span="1" className="col-4" />
          <col span="1" className="col-5" />
          <col span="1" className="col-6" />
          <col span="1" className="col-7" />
          <col span="1" className="col-8" />
          <col span="1" className="col-9" />
          <col span="1" className="col-10" />
          <col span="1" className="col-11" />
          <col span="1" className="col-12" />
        </colgroup>
        <thead>
          <tr className={style.plate__row}>
            <th className={style.plate__header} scope="col" />
            <th className={style.plate__header} scope="col">
              1
            </th>
            <th className={style.plate__header} scope="col">
              2
            </th>
            <th className={style.plate__header} scope="col">
              3
            </th>
            <th className={style.plate__header} scope="col">
              4
            </th>
            <th className={style.plate__header} scope="col">
              5
            </th>
            <th className={style.plate__header} scope="col">
              6
            </th>
            <th className={style.plate__header} scope="col">
              7
            </th>
            <th className={style.plate__header} scope="col">
              8
            </th>
            <th className={style.plate__header} scope="col">
              9
            </th>
            <th className={style.plate__header} scope="col">
              10
            </th>
            <th className={style.plate__header} scope="col">
              11
            </th>
            <th className={style.plate__header} scope="col">
              12
            </th>
          </tr>
        </thead>
        <tbody>{tableBody()}</tbody>
      </table>
    </div>
  );
}

export default PlateZoom;
