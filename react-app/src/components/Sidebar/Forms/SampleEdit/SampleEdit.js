import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "./SampleEdit.module.css";
import { editSample } from "../../../../store/sample";
import getInputDateTime from "../../../../utils/getInputDateTime";

function SampleForm() {
  const { sampleId } = useParams();
  const sample = useSelector((state) => state.samples.byId[sampleId]);
  const dispatch = useDispatch();
  const history = useHistory();
  const SAMPLE_TYPES = [
    ["Whole Blood", "whole_blood"],
    ["Plasma", "plasma"],
    ["CF DNA", "cf_dna"],
  ];

  const [plateId, setPlateId] = useState(sample.plate_id);
  const [boxId, setBoxId] = useState(sample.box_id);
  const [sampleType, setSampleType] = useState(sample.sample_type);
  const [accessionDate, setAccessionDate] = useState(
    getInputDateTime(sample.accession_date)
  );
  const [storeDate, setStoreDate] = useState(
    getInputDateTime(sample.store_date)
  );
  const [expirationDate, setExpirationDate] = useState(
    getInputDateTime(sample.expiration_date)
  );
  const [thawCount, setThawCount] = useState(sample.thaw_count);
  const [discarded, setDiscarded] = useState(sample.discarded);

  const firstPlateId = (e) => {
    // TODO: This isn't working yet, come back later
    e.preventDefault();
    if (boxId === "") {
      setPlateId(1);
    } else {
      setBoxId("");
      setPlateId(1);
    }
  };

  const firstBoxId = (e) => {
    // TODO: Come back once database is more fleshed out
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
    const editedSample = await dispatch(
      editSample({
        id: sample.id,
        box_id: boxId,
        plate_id: plateId,
        accession_date: accessionDate,
        store_date: storeDate,
        thaw_count: thawCount,
        sample_type: sampleType,
        discarded,
        expiry_date: expirationDate,
      })
    );
    const newSampleId = editedSample.sample.id;
    history.push(`/samples/${newSampleId}`);
  };

  return (
    <form className={style.navbar__form} onSubmit={submitSample}>
      <h3>Editing Sample #{sample.id}</h3>
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
      <div>
        <label htmlFor="accession_date">Accession Date:</label>
        <input
          type="datetime-local"
          value={accessionDate}
          onChange={(e) => setAccessionDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="store_date">Storage Date:</label>
        <input
          type="datetime-local"
          value={storeDate}
          onChange={(e) => setStoreDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="expiration_date">Expiration Date:</label>
        <input
          type="datetime-local"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="thaw_count">Thaw Count: </label>
        <input
          value={thawCount}
          onChange={(e) => setThawCount(e.target.value)}
          type="number"
          placeholder="Enter times sample was thawed"
        />
      </div>
      <div>
        <label htmlFor="discarded">Sample Discarded: </label>
        <label>
          <input
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
            type="radio"
            name="discarded"
            value="false"
            checked={discarded === false}
            onChange={() => setDiscarded(false)}
          />
          No
        </label>
      </div>
      <button className={style.navbar__form__submit}>Submit</button>
    </form>
  );
}

export default SampleForm;
