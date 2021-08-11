import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { createSample } from "../../../../store/sample";
import { getPlates } from "../../../../store/plate";
import getInputDateTime from "../../../../utils/getInputDateTime";
import findMissingNumber from "../../../../utils/findMissingNumber";

function SampleForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const SAMPLE_TYPES = [
    ["Whole Blood", "whole_blood"],
    ["Plasma", "plasma"],
    ["CF DNA", "cf_dna"],
  ];
  const [manifest, setManifest] = useState(null);
  const [manifestLoading, setManifestLoading] = useState(false);
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
    const formData = new FormData();
    if (plateId) formData.append("plate_id", plateId);
    if (wellId) formData.append("well_id", wellId);
    if (accessionDate) formData.append("accession_date", accessionDate);
    formData.append("sample_type", sampleType);
    formData.append("thaw_count", 0);
    formData.append("discarded", false);
    if (manifest) {
      formData.append("manifest", manifest);
      setManifestLoading(true);
    }
    const newSample = await dispatch(createSample(formData));
    const newSampleId = newSample.sample.id;
    history.push(`/samples/${newSampleId}`);
  };

  const updateManifest = (e) => {
    const file = e.target.files[0];
    setManifest(file);
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
      if (firstEmptyWell <= parseInt(plates[plateId]["max_well"])) {
        setWellId(firstEmptyWell);
      } else {
        alert(`Plate ${plateId} is full. Please choose new plate.`);
        setPlateId("");
      }
    } else {
      getPlateId(e);
    }
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
      <div className={style.property}>
        <label htmlFor="manifest" className={style.property__label}>
          Manifest:{" "}
        </label>
        <input
          onChange={updateManifest}
          type="file"
          accept="image/*"
          placeholder="Upload manifest"
          className={style.property__field}
        />
      </div>
      <button type="submit" className={style.sidebar__button}>
        Submit
      </button>
      {manifestLoading && <p>Loading...</p>}
    </form>
  );
}

export default SampleForm;
