import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { createSample } from "../../../../store/sample";
import { getPlates } from "../../../../store/plate";
import getInputDateTime from "../../../../utils/getInputDateTime";

function SampleForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const SAMPLE_TYPES = [
    ["Whole Blood", "whole_blood"],
    ["Plasma", "plasma"],
    ["CF DNA", "cf_dna"],
  ];
  const plates = useSelector((state) => state.plates?.byId);
  const [plateId, setPlateId] = useState(
    location.state?.plateId ? location.state.plateId : ""
  );
  const [wellId, setWellId] = useState(
    location.state?.wellId ? location.state.wellId : ""
  );
  const [sampleType, setSampleType] = useState(SAMPLE_TYPES[0][1]);
  const [accessionDate, setAccessionDate] = useState(getInputDateTime());

  useEffect(() => {
    dispatch(getPlates());
  }, [dispatch]);

  const submitSample = async (e) => {
    e.preventDefault();
    console.log("Well ID", wellId)
    const newSample = await dispatch(
      createSample({
        ...(plateId && { plate_id: plateId }),
        ...(wellId && { well_id: wellId }),
        ...(accessionDate && { accession_date: accessionDate }),
        sample_type: sampleType,
        thaw_count: 0,
        discarded: false,
      })
    );
    console.log("New sample:", newSample)
    const newSampleId = newSample.sample.id;
    history.push(`/samples/${newSampleId}`);
  };

  const getPlateId = (e) => {
    /**
     * Grabs an empty plate and assigns the new sample to the first well,
     * A1. In most biotech companies, you're going to want to set up a new
     * plate for each sample-set due to the nature of freezing the plate.
     */
    e.preventDefault();
    const plateForSample = Object.values(plates)?.find(
      (plate) => plate.samples.length === 0
    );
    setPlateId(plateForSample?.id);
    setWellId(1);
  };

  const getWellId = (e) => {
    /**
     * Grabs a well for each newly created sample. If no plate ID is
     * specified, calls getPlateId. If plate is specified, grabs first
     * available well.
     */
    e.preventDefault();
    if (plateId) {
      const wellList = Object.keys(plates[plateId]["samples_and_wells"]).map(
        (well) => parseInt(well)
      );
      const firstEmptyWell = findMissingNumber(wellList, 0, wellList.length);
      if (firstEmptyWell < parseInt(plates[plateId]["max_well"])) {
        setWellId(firstEmptyWell);
      } else {
        alert(`Plate ${plateId} is full. Please choose new plate.`)
        setPlateId("");
      }
    } else {
      getPlateId(e);
    }
  };

  function findMissingNumber(wellList, min, max) {
    /**
     * Uses a modified binary search to find the first well in a plate.
     */
    if (min >= max) {
      // base case
      return min + 1;
    } else {
      // recursive case
      const pivot = Math.floor((min + max) / 2);
      if (wellList[pivot] === pivot + 1) {
        // case missing is greater than pivot
        return findMissingNumber(wellList, pivot + 1, max);
      } else {
        // case missing is less than pivot
        return findMissingNumber(wellList, min, pivot);
      }
    }
  }

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
          onChange={(e) => {
            setPlateId(e.target.value);
            setWellId("");
          }}
          type="number"
          placeholder="Enter ID"
        />
        <button onClick={getPlateId} className={style.sidebar__button}>
          Get ID
        </button>
      </div>
      <div className={style.property}>
        <label htmlFor="well_id" className={style.property__label}>
          Well Id:{" "}
        </label>
        <input
          className={style["property__field-small"]}
          value={wellId}
          onChange={(e) => setWellId(e.target.value)}
          type="number"
          placeholder="Enter ID"
        />
        <button onClick={getWellId} className={style.sidebar__button}>
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
