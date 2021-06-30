import React, { useEffect, useState } from "react";
import style from "./SampleForm.module.css";

function SampleForm() {
  const [plateId, setPlateId] = useState(null);

  const submitSample = (e) => {
    e.preventDefault();
  }

  return (
    <form className={style.navbar__form} onSubmit={submitSample}>
      <label htmlFor="image_src">Image Source: </label>
      <input
        value={plateId}
        onChange={(e) => setPlateId(e.target.value)}
        type="number"
        placeholder="Enter plate Id"
      />
      <button className={style.navbar__form__submit}>Submit</button>
    </form>
  );
}

export default SampleForm;
