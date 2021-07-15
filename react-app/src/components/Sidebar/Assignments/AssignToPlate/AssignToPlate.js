import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Select from "react-select";
import style from "../Form.module.css";

function AssignToPlate() {
  const { wellId, plateId } = useParams();
  const [sampleId, setSampleId] = useState();
  const [newSample, toggleNewSample] = useState();
  const samples = useSelector((state) => Object.values(state.samples.byId));

  const sampleSearchOptions = samples?.map((sample) => {
    return { value: sample.id, label: `Sample ${sample.id}` };
  });

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

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 10,
    }),
    control: () => ({
      display: "flex",
    }),
    singleValue: (provided, state) => {
      return { ...provided };
    },
  };

  const storeSample = async e => {
    e.preventDefault();
    if (sampleId) {
      return;
    } else {
      return;
    }
  }

  return (
    <form className={style.sidebar__container} onSubmit={storeSample}>
      <h3 className={style.sidebar__header}>
        Assign sample to plate {plateId},{" "}
        {`${rowNameConversion[wellId % 8]}${Math.floor(wellId / 8 + 1)}`}
      </h3>
      <div className={style.property}>
        <label htmlFor="newSample" className={style.property__label}>
          Storing new sample?{" "}
        </label>
        <label>
          <input
            type="radio"
            name="newSample"
            checked={newSample === true}
            onClick={() => {
              toggleNewSample(true);
            }}
            onChange={() => toggleNewSample(true)}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="existingSample"
            checked={newSample === false}
            onClick={() => {
              toggleNewSample(false);
            }}
            onChange={() => toggleNewSample(false)}
          />
          No
        </label>
      </div>
      <div
        className={
          newSample === true
            ? style.sidebar__section
            : style["sidebar__section-hidden"]
        }
      >
        <button className={`${style.sidebar__button} ${style.sidebar__button__spaced}`}>Assign New Sample</button>
      </div>
      <div
        className={
          newSample === false
            ? style.sidebar__section
            : style["sidebar__section-hidden"]
        }
      >
        <Select
          options={sampleSearchOptions}
          styles={selectStyles}
          onChange={(e) => setSampleId({ value: e.value, label: `${e.label}` })}
          className={style["select-container"]}
          classNamePrefix="select-container"
          menuPlacement="bottom"
          placeholder="Store sample..."
          value={sampleId}
        />
        <button className={style.sidebar__button}>
          Assign Existing Sample
        </button>
      </div>
    </form>
  );
}

export default AssignToPlate;
