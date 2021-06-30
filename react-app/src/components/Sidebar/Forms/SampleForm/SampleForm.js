import React, { useEffect, useState } from "react";
import style from "./SampleForm.module.css";

function SampleForm() {
  const [plateId, setPlateId] = useState(null);
  const [boxId, setBoxId] = useState(null)

  const submitSample = (e) => {
    e.preventDefault();
  };

  return (
    <form className={style.navbar__form} onSubmit={submitSample}>
      <div>
        <label htmlFor="plate_id">Plate Id: </label>
        <input
          value={plateId}
          onChange={(e) => setPlateId(e.target.value)}
          type="number"
          placeholder="Enter plate Id"
        />
      </div>
      <div>
        <label htmlFor="box_id">Box Id: </label>
        <input
          value={plateId}
          onChange={(e) => setBoxId(e.target.value)}
          type="number"
          placeholder="Enter box Id"
        />
      </div>
      <button className={style.navbar__form__submit}>Submit</button>
    </form>
  );
}

export default SampleForm;
