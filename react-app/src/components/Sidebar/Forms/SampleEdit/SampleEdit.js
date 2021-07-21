import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form.module.css";
import { editSample, getSamples } from "../../../../store/sample";
import getInputDateTime from "../../../../utils/getInputDateTime";
import { getPlates } from "../../../../store/plate";

function SampleForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { sampleId } = useParams();
  const sample = useSelector((state) => state.samples.byId[sampleId]);
  const plates = useSelector((state) => state.plates?.byId);
  const SAMPLE_TYPES = [
    ["Whole Blood", "whole_blood"],
    ["Plasma", "plasma"],
    ["CF DNA", "cf_dna"],
  ];

  const [plateId, setPlateId] = useState(sample?.plate_id);
  const [wellId, setWellId] = useState(sample?.well_id);
  const [sampleType, setSampleType] = useState(sample?.sample_type);
  const [accessionDate, setAccessionDate] = useState(
    getInputDateTime(sample?.accession_date)
  );
  const [storeDate, setStoreDate] = useState(
    getInputDateTime(sample?.store_date)
  );
  const [expirationDate, setExpirationDate] = useState(
    getInputDateTime(sample?.expiration_date)
  );
  const [thawCount, setThawCount] = useState(sample?.thaw_count);
  const [discarded, setDiscarded] = useState(sample?.discarded);

  useEffect(() => {
    dispatch(getSamples());
    dispatch(getPlates());
  }, [dispatch]);

  const submitSample = async (e) => {
    e.preventDefault();
    await dispatch(
      editSample({
        id: sample?.id,
        plate_id: plateId,
        well_id: wellId,
        accession_date: accessionDate,
        store_date: storeDate,
        thaw_count: thawCount,
        sample_type: sampleType,
        discarded,
        expiry_date: expirationDate,
      })
    );
    history.push(`/samples/${sampleId}`);
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
        alert(`Plate ${plateId} is full. Please choose new plate.`);
        setPlateId("");
      }
    } else {
      getPlateId(e);
    }
  };

  return (
    <form className={style.navbar__form} onSubmit={submitSample}>
      <h3 className={style.form__header}>Editing Sample #{sample?.id}</h3>
      <div className={style.property}>
        <label htmlFor="plate_id" className={style.property__label}>
          Plate Id:
        </label>
        <input
          className={style["property__field-small"]}
          value={plateId}
          onChange={(e) => setPlateId(e.target.value)}
          type="number"
          placeholder="Enter plate Id"
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
          Sample Type:
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
        <label htmlFor="store_date" className={style.property__label}>
          Storage Date:
        </label>
        <input
          className={style.property__field}
          type="datetime-local"
          value={storeDate}
          onChange={(e) => setStoreDate(e.target.value)}
        />
      </div>
      <div className={style.property}>
        <label htmlFor="expiration_date" className={style.property__label}>
          Expiration Date:
        </label>
        <input
          className={style.property__field}
          type="datetime-local"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>
      <div className={style.property}>
        <label htmlFor="thaw_count" className={style.property__label}>
          Thaw Count:
        </label>
        <input
          className={style.property__field}
          value={thawCount}
          onChange={(e) => setThawCount(e.target.value)}
          type="number"
          placeholder="Times thawed"
        />
      </div>
      <div className={style.property}>
        <label htmlFor="discarded" className={style.property__label}>
          Sample Discarded:
        </label>
        <label>
          <input
            className={style.property__field}
            type="radio"
            name="discarded"
            value="true"
            checked={discarded === true}
            onChange={() => setDiscarded(true)}
          />
          Yes
        </label>
        <label>
          <input
            className={style.property__field}
            type="radio"
            name="discarded"
            value="false"
            checked={discarded === false}
            onChange={() => setDiscarded(false)}
          />
          No
        </label>
      </div>
      <button className={style.sidebar__button} type="submit">
        Submit
      </button>
    </form>
  );
}

export default SampleForm;
