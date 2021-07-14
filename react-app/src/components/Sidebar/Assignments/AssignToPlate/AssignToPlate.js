import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Select from "react-select";
import style from "../Form.module.css";

function AssignToPlate() {
  const { wellId, plateId } = useParams();
  const [sampleId, setSampleId] = useState();
  const samples = useSelector((state) => Object.values(state.samples.byId));

  const sampleSearchOptions = samples?.map((sample) => {
    return { value: sample.id, label: `Sample ${sample.id}` };
  });

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 10,
    }),
    control: () => ({
      width: 250,
      display: "flex",
    }),
    singleValue: (provided, state) => {
      const width = 400;

      return { ...provided, width };
    },
  };

  return (
    <>
      <button className={style.sidebar__button}>Create New Sample</button>
      <h1>Hello!</h1>
      <div>Welcome to assignment for plate {plateId} to well {wellId}....</div>
      <div>
        <label>Assign to </label>
      </div>
      <Select
        options={sampleSearchOptions}
        styles={selectStyles}
        onChange={(e) =>
          setSampleId({ value: e.value, label: `${e.label}` })
        }
        className={style["select-container"]}
        classNamePrefix="select-container"
        menuPlacement="bottom"
        placeholder="Store sample..."
        value={sampleId}
      />
    </>
  );
}

export default AssignToPlate;
