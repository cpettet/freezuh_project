import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "./SampleEdit.module.css";

function SampleEdit() {
  const { sampleId } = useParams();
  const sample = useSelector((state) => state.samples.byId[sampleId]);
  const dispatch = useDispatch();
  const history = useHistory();
  const SAMPLE_TYPES = [
    ["Whole Blood", "whole_blood"],
    ["Plasma", "plasma"],
    ["CF DNA", "cf_dna"],
  ];
  const [plateId, setPlateId] = useState(sample["plate_id"]);
  const [boxId, setBoxId] = useState(sample["box_id"]);
  const [sampleType, setSampleType] = useState(sample["sample_type"]);
  const [accessionDate, setAccessionDate] = useState(sample["accession_date"]);
  const [storeDate, setStoreDate] = useState(sample["store_date"]);
  const [thawCount, setThawCount] = useState(sample["thaw_count"]);
  const [discarded, setDiscarded] = useState(sample["discarded"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/samples/${sample["id"]}`)
  };

  return (
    <form style={style.form__edit} onSubmit={handleSubmit}>
      <input type="datetime-local" />
      <button>Submit Changes</button>
    </form>
  );
}

export default SampleEdit;
