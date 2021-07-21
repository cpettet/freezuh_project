import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import style from "../Form.module.css";
import { editPlate } from "../../../../store/plate";
import getInputDateTime from "../../../../utils/getInputDateTime";

function AssignToRack() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { rackPosition, rackId } = useParams();
  const [plateId, setPlateId] = useState();
  const [newPlate, toggleNewPlate] = useState();
  const plates = useSelector((state) => Object.values(state.plates.byId));
  let plate = useSelector((state) => state.plates.byId[plateId?.value]);

  const plateSearchOptions = plates?.map((plate) => {
    return { value: plate.id, label: `Plate ${plate.id}` };
  });

  const rowNameConversion = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
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

  const storePlate = async (e) => {
    e.preventDefault();
    if (plateId) {
      await dispatch(
        editPlate({
          id: plate?.id,
          rack_id: rackId,
          store_date: getInputDateTime(),
          rack_position: rackPosition,
          discarded: plate?.discarded,
          max_well: plate?.max_well,
          thaw_count: plate?.thaw_count,
        })
      );
      history.push(`/plates/${plateId.value}`);
    } else {
      history.push("/plates/new", { plateId, rackPosition });
    }
  };

  return (
    <form className={style.sidebar__container} onSubmit={storePlate}>
      <h3 className={style.sidebar__header}>
        Assign plate to rack {rackId},{" "}
        {`${rowNameConversion[plateId % 5]}${
          plateId % 5 === 0 ? Math.floor(plateId / 5) : Math.floor(plateId / 5 + 1)
        }`}
      </h3>
      <div className={style.property}>
        <label htmlFor="newPlate" className={style.property__label}>
          Storing new plate?{" "}
        </label>
        <div>
          <label>
            <input
              type="radio"
              name="newPlte"
              checked={newPlate === true}
              onClick={() => {
                toggleNewPlate(true);
              }}
              onChange={() => toggleNewPlate(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="existingSample"
              checked={newPlate === false}
              onClick={() => {
                toggleNewPlate(false);
              }}
              onChange={() => toggleNewPlate(false)}
            />
            No
          </label>
        </div>
      </div>
      <div
        className={
          newPlate === true
            ? style.sidebar__section
            : style["sidebar__section-hidden"]
        }
      >
        <button
          className={`${style.sidebar__button} ${style.sidebar__button__spaced}`}
          onSubmit={storePlate}
        >
          Assign New Plate
        </button>
      </div>
      <div
        className={
          newPlate === false
            ? style.sidebar__section
            : style["sidebar__section-hidden"]
        }
      >
        <Select
          options={plateSearchOptions}
          styles={selectStyles}
          onChange={(e) => setPlateId({ value: e.value, label: `${e.label}` })}
          className={style["select-container"]}
          classNamePrefix="select-container"
          menuPlacement="bottom"
          placeholder="Store sample..."
          value={plateId}
        />
        <button className={style.sidebar__button} onSubmit={storePlate}>
          Assign Existing Plate
        </button>
      </div>
    </form>
  );
}

export default AssignToRack;