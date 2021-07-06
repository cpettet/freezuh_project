import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import style from "./SampleForm.module.css";
import { createSample } from "../../../../store/sample";
import getInputDateTime from "../../../../utils/getInputDateTime";

function SampleForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const SAMPLE_TYPES = [
    ["Whole Blood", "whole_blood"],
    ["Plasma", "plasma"],
    ["CF DNA", "cf_dna"],
  ];
  const [plateId, setPlateId] = useState("");
  // const [boxId, setBoxId] = useState();
  const [sampleType, setSampleType] = useState(SAMPLE_TYPES[0][1]);
  const [accessionDate, setAccessionDate] = useState(getInputDateTime());
  // const [storeDate, setStoreDate] = useState();

  const firstPlateId = (e) => {
    e.preventDefault();
  };

  // const firstBoxId = (e) => {
  //   e.preventDefault();
  // };

  const submitSample = async (e) => {
    e.preventDefault();
    const newSample = await dispatch(
      createSample({
        // ...(boxId && { box_id: boxId }),
        ...(plateId && { plate_id: plateId }),
        ...(accessionDate && { accession_date: accessionDate }),
        // ...(storeDate && { store_date: storeDate }),
        // ...(expirationDate && { expiry_date: expirationDate }),
        sample_type: sampleType,
        thaw_count: 0,
        discarded: false,
      })
    );
    const newSampleId = newSample.sample.id;
    history.push(`/samples/${newSampleId}`);
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
      {/* <div className={style.navbar__form__boxId}>
        <label htmlFor="box_id">Box Id: </label>
        <input
          value={boxId}
          onChange={(e) => setBoxId(e.target.value)}
          type="number"
          placeholder="Enter box Id"
        />
      </div>
      <button onClick={firstBoxId}>Populate Open Box ID</button> */}
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
      <div>
        <label htmlFor="accession_date">Accession Date:</label>
        <input
          type="datetime-local"
          value={accessionDate}
          onChange={(e) => setAccessionDate(e.target.value)}
        />
      </div>
      {/* <div>
        <label htmlFor="store_date">Storage Date:</label>
        <input
          type="datetime-local"
          value={storeDate}
          onChange={(e) => setStoreDate(e.target.value)}
        />
      </div> */}
      <button type="submit" className={style.navbar__form__submit}>
        Submit
      </button>
    </form>
  );
}

export default SampleForm;
