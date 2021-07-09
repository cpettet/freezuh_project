import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import style from "../Form.module.css";
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
  const [sampleType, setSampleType] = useState(SAMPLE_TYPES[0][1]);
  const [accessionDate, setAccessionDate] = useState(getInputDateTime());

  const firstPlateId = (e) => {
    e.preventDefault();
  };

  const submitSample = async (e) => {
    e.preventDefault();
    const newSample = await dispatch(
      createSample({
        ...(plateId && { plate_id: plateId }),
        ...(accessionDate && { accession_date: accessionDate }),
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
      <h3 className={style.form__header}>Creating new sample</h3>
      <div className={style.property}>
        <label htmlFor="plate_id" className={style.property__label}>
          Plate Id:{" "}
        </label>
        <input
          className={style["property__field-small"]}
          value={plateId}
          onChange={(e) => setPlateId(e.target.value)}
          type="number"
          placeholder="Enter ID"
        />
        <button className={style.sidebar__button} onClick={firstPlateId}>
          Get ID
        </button>
      </div>
      <div className={style.property}>
        <label htmlFor="sample_type" className={style.property__label}>
          Sample Type:{" "}
        </label>
        <select
          className={style.property__field}
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
      <div className={style.property}>
        <label htmlFor="accession_date" className={style.property__label}>
          Accession Date:
        </label>
        <input
          className={style.property__field}
          type="datetime-local"
          value={accessionDate}
          onChange={(e) => setAccessionDate(e.target.value)}
        />
      </div>
      <button type="submit" className={style.sidebar__button}>
        Submit
      </button>
    </form>
  );
}

export default SampleForm;
