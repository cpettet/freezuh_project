import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import style from "../Form.module.css";
import { editRack } from "../../../../store/rack";

function AssignToFreezer() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { freezerPosition } = useParams();
  freezerPosition = parseInt(freezerPosition) + 1;
  const { freezerId } = useParams();
  const [rackId, setRackId] = useState();
  const [newRack, toggleNewRack] = useState();
  const racks = useSelector((state) => Object.values(state.racks.byId));
  let rack = useSelector((state) => state.racks.byId[rackId?.value]);

  const rackSearchOptions = racks?.map((rack) => {
    return { value: rack.id, label: `Rack ${rack.id}` };
  });

  const rowNameConversion = {
    1: "top row",
    2: "2nd row",
    3: "middle row",
    4: "4th row",
    5: "bottom row",
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

  const storeRack = async (e) => {
    e.preventDefault();
    if (rackId) {
      await dispatch(
        editRack({
          id: rack?.id,
          freezer_id: parseInt(freezerId),
          freezer_position: freezerPosition,
          discarded: rack?.discarded,
          max_position: rack?.max_position,
        })
      );
      history.push(`/racks/${rackId.value}`);
    } else {
      history.push("/racks/new", { freezerPosition, freezerId });
    }
  };

  return (
    <form className={style.sidebar__container} onSubmit={storeRack}>
      <h3 className={style.sidebar__header}>
        Assign rack to freezer {freezerId},{" "}
        {`${
          freezerPosition % 5 === 0
            ? rowNameConversion[Math.floor(freezerPosition / 5)]
            : rowNameConversion[Math.floor(freezerPosition / 5 + 1)]
        }
        space number ${freezerPosition % 5 === 0 ? 5 : freezerPosition % 5}`}
      </h3>
      <div className={style.property}>
        <label htmlFor="newRack" className={style.property__label}>
          Storing new rack?{" "}
        </label>
        <div>
          <label>
            <input
              type="radio"
              name="newRack"
              checked={newRack === true}
              onClick={() => {
                toggleNewRack(true);
              }}
              onChange={() => toggleNewRack(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="existingPlate"
              checked={newRack === false}
              onClick={() => {
                toggleNewRack(false);
              }}
              onChange={() => toggleNewRack(false)}
            />
            No
          </label>
        </div>
      </div>
      <div
        className={
          newRack === true
            ? style.sidebar__section
            : style["sidebar__section-hidden"]
        }
      >
        <button
          className={`${style.sidebar__button} ${style.sidebar__button__spaced}`}
          onSubmit={storeRack}
        >
          Assign New Rack
        </button>
      </div>
      <div
        className={
          newRack === false
            ? style.sidebar__section
            : style["sidebar__section-hidden"]
        }
      >
        <Select
          options={rackSearchOptions}
          styles={selectStyles}
          onChange={(e) => setRackId({ value: e.value, label: e.label })}
          className={style["select-container"]}
          classNamePrefix="select-container"
          menuPlacement="bottom"
          placeholder="Store rack..."
          value={rackId}
        />
        <button className={style.sidebar__button} onSubmit={storeRack}>
          Assign Existing Rack
        </button>
      </div>
    </form>
  );
}

export default AssignToFreezer;