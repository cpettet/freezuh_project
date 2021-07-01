import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import style from "./SampleForm.module.css";
import { createSample } from "../../../../store/sample";

function SampleForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const SAMPLE_TYPES = [
    ["Whole Blood", "whole_blood"],
    ["Plasma", "plasma"],
    ["CF DNA", "cf_dna"],
  ];
  const [plateId, setPlateId] = useState(null);
  const [boxId, setBoxId] = useState(null);
  const [sampleType, setSampleType] = useState(SAMPLE_TYPES[0][1]);

  const firstPlateId = (e) => {
    e.preventDefault();
    if (boxId === "") {
      setPlateId(1);
    } else {
      setBoxId("");
      setPlateId(1);
    }
  };

  const firstBoxId = (e) => {
    e.preventDefault();
    if (plateId === "") {
      setBoxId(1);
    } else {
      setPlateId("");
      setBoxId(1);
    }
  };

  const submitSample = async (e) => {
    e.preventDefault();
    const newSample = await dispatch(createSample({
      // box_id: boxId,
      // plate_id: plateId,
      sample_type: sampleType,
      discarded: false,
    }));
    console.log(newSample)
    const newSampleId = newSample.sample.id;
    history.push(`/samples/${newSampleId}`)
  };

  return (
    <form className={style.navbar__form} onSubmit={submitSample}>
      <div className={style.navbar__form__plateId}>
        <label htmlFor="plate_id">Plate Id: </label>
        <input
          value={plateId}
          onChange={(e) => setPlateId(e.target.value)}
          type="number"
          placeholder="Enter plate Id"
        />
      </div>
      <button onClick={firstPlateId}>Populate Open Plate ID</button>
      <div className={style.navbar__form__boxId}>
        <label htmlFor="box_id">Box Id: </label>
        <input
          value={boxId}
          onChange={(e) => setBoxId(e.target.value)}
          type="number"
          placeholder="Enter box Id"
        />
      </div>
      <button onClick={firstBoxId}>Populate Open Box ID</button>
      <div className={style.navbar__form__sampleType}>
        <label htmlFor="sample_type">Sample Type: </label>
        <select
          value={sampleType}
          onChange={(e) => setSampleType(e.target.value)}
        >
          {SAMPLE_TYPES.map((type) => (
            <option key={type[0]} value={type[1]}>
              {type[0]}
            </option>
          ))}
        </select>
      </div>
      <button className={style.navbar__form__submit}>Submit</button>
    </form>
  );
}

export default SampleForm;
