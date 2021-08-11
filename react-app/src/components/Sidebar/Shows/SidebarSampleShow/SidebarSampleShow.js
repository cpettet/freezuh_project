import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import style from "../Show.module.css";
import { deleteSample } from "../../../../store/sample";

function SidebarSampleShow() {
  const { sampleId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sample = useSelector((state) => state.samples.byId[sampleId]);

  const rowNameConversion = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    "-1": "H",
  };

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSample(sample));
  };

  const onEdit = (e) => {
    e.preventDefault();
    history.push(`/samples/${sampleId}/edit`);
  };

  return (
    <div className={style.sidebar__container}>
      <h3 className={style.sidebar__header}>
        Sample {sampleId}:{" "}
        {sample?.discarded ? (
          <span className={style["sidebar__header-inactive"]}>DISCARDED</span>
        ) : sample?.store_date && true ? (
          <span className={style["sidebar__header-active"]}>STORED</span>
        ) : (
          <span className={style["sidebar__header-neutral"]}>NOT STORED</span>
        )}
      </h3>
      <div className={style.properties}>
        <div className={style.property}>
          <div className={style.property__key}>Accessioned:</div>
          <div className={style.property__value}>{sample?.accession_date}</div>
        </div>
      </div>
      <div className={style.properties}>
        <div className={style.property}>
          <div className={style.property__key}>Expiration:</div>
          <div className={style.property__value}>{sample?.expiration_date}</div>
        </div>
      </div>
      {sample?.store_date && (
        <>
          <div className={style.properties}>
            <div className={style.property}>
              <div className={style.property__key}>Sample stored:</div>
              <div className={style.property__value}>{sample?.store_date}</div>
            </div>
          </div>
          <div className={style.properties}>
            <div className={style.property}>
              <div className={style.property__key}>Stored in plate:</div>
              <div className={style.property__value}>{sample?.plate_id}</div>
            </div>
          </div>
          <div className={style.properties}>
            <div className={style.property}>
              <div className={style.property__key}>Position on plate:</div>
              <div className={style.property__value}>
                {`
            ${
              rowNameConversion[
                String(parseInt(sample?.sample_position[1]) - 1)
              ]
            }
            ${
              rowNameConversion[
                String(parseInt(sample?.sample_position[1]) - 1)
              ] === "H"
                ? parseInt([sample?.sample_position[0]])
                : parseInt([sample?.sample_position[0]]) + 1
            }
            `}
              </div>
            </div>
          </div>
        </>
      )}

      <div className={style.properties}>
        <div className={style.property}>
          <div className={style.property__key}>Sample type:</div>
          <div className={style.property__value}>{sample?.sample_type}</div>
        </div>
      </div>
      <div className={style.properties}>
        <div className={style.property}>
          <div className={style.property__key}>Times thawed:</div>
          <div className={style.property__value}>{sample?.thaw_count}</div>
        </div>
      </div>
      {sample?.manifest_url && (
        <div className={style.properties}>
          <div className={style.property}>
            <div className={style.property__key}>
              <a href={sample?.manifest_url}>Download manifest</a>
            </div>
          </div>
        </div>
      )}
      <div className={style.sidebar__buttons}>
        <button
          onClick={onEdit}
          className={`${style.sidebar__buttons__edit} ${style.sidebar__buttons__button}`}
        >
          Edit Properties
        </button>
        <button
          onClick={onDelete}
          className={`${style.sidebar__buttons__delete} ${style.sidebar__buttons__button}`}
        >
          Discard Sample
        </button>
      </div>
    </div>
  );
}

export default SidebarSampleShow;
