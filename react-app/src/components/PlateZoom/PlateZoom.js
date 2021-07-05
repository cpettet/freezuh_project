import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./PlateZoom.module.css";

function PlateZoom() {
  const { plateId } = useParams();
  const plate = useSelector((state) => state.plates.byId[plateId]);
  let count = 0;
  const numRows = 8;
  const numCols = 13;

  function tableBody() {
    const rows = [];
    for (let row = 0; row < numRows; row++) {
      const rowClass = `row-${row}`;
      const cellsInRow = [];
      for (let col = 0; col < numCols; col++) {
        const cellId = `cell-${row}:${col}`;
        const colClass = `col-${col}`
        cellsInRow.push(<td key={cellId} className={colClass}>{cellId}</td>)
      }
      rows.push(<tr key={row} className={rowClass}>{cellsInRow}</tr>)
    }
    return rows;
  }

  return (
    <table>
      <colgroup>
        <col span="1" className="row-names" />
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
        <tr>
          <td />
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
          <th scope="col">6</th>
          <th scope="col">7</th>
          <th scope="col">8</th>
          <th scope="col">9</th>
          <th scope="col">10</th>
          <th scope="col">11</th>
          <th scope="col">12</th>
        </tr>
      </thead>
      <tbody>{tableBody()}</tbody>
    </table>
  );
}

export default PlateZoom;
