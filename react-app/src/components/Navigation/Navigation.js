import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import style from "./Navigation.module.css";
import logo from "./Freezer-Final.min.svg";
import ProfileButton from "../ProfileButton/ProfileButton";
import { getFreezers } from "../../store/freezer";
import { getRacks } from "../../store/rack";
import { getPlates } from "../../store/plate";
import { getSamples } from "../../store/sample";

function Navigation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const freezers = useSelector((state) => Object.values(state.freezers.byId));
  const racks = useSelector((state) => Object.values(state.racks.byId));
  const plates = useSelector((state) => Object.values(state.plates.byId));
  const samples = useSelector((state) => Object.values(state.samples.byId));

  const freezerSearchOptions = freezers.map((freezer) => {
    return { value: freezer.id, label: `Freezer ${freezer.id}` };
  });

  const rackSearchOptions = racks.map((rack) => {
    return { value: rack.id, label: `Rack ${rack.id}` };
  });

  const plateSearchOptions = plates.map((plate) => {
    return { value: plate.id, label: `Plate ${plate.id}` };
  });

  const sampleSearchOptions = samples.map((sample) => {
    return { value: sample.id, label: `Sample ${sample.id}` };
  });

  const [freezerId, setFreezerId] = useState(null);
  const [rackId, setRackId] = useState(null);
  const [plateId, setPlateId] = useState(null);
  const [sampleId, setSampleId] = useState(null);

  const setSearchValue = (type, item) => {
    if (type === "freezer") {
      setFreezerId({ value: item, label: `Freezer ${item}` });
      setRackId(null);
      setPlateId(null);
      setSampleId(null);
    } else if (type === "rack") {
      setFreezerId(null);
      setRackId({ value: item, label: `Rack ${item}` });
      setPlateId(null);
      setSampleId(null);
    } else if (type === "plate") {
      setFreezerId(null);
      setRackId(null);
      setPlateId({ value: item, label: `Plate ${item}` });
      setSampleId(null);
    } else if (type === "sample") {
      setFreezerId(null);
      setRackId(null);
      setPlateId(null);
      setSampleId({ value: item, label: `Sample ${item}` });
    }
  };

  const handleFormReset = (e) => {
    setFreezerId(null);
    setRackId(null);
    setPlateId(null);
    setSampleId(null);
  };

  useEffect(() => {
    dispatch(getFreezers());
    dispatch(getRacks());
    dispatch(getPlates());
    dispatch(getSamples());
    setFreezerId("");
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [fId, rId, pId, sId] = [freezerId, rackId, plateId, sampleId];
    handleFormReset();
    if (fId?.value) {
      history.push(`/freezers/${fId.value}`);
    } else if (rId?.value) {
      history.push(`/racks/${rId.value}`);
    } else if (pId?.value) {
      history.push(`/plates/${pId.value}`);
    } else if (sId?.value) {
      history.push(`/samples/${sId.value}`);
    } else {
      history.push("/about");
    }
  };

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 10,
    }),
    control: () => ({
      width: 400,
      display: "flex",
    }),
    singleValue: (provided, state) => {
      const width = 400;

      return { ...provided, width };
    },
  };

  return (
    <div className={style.navbar__container}>
      <nav className={style.navbar}>
        <div className={style.navbar__upper}>
          <div className={style.navbar__upper__logo}>
            <Link to="/">
              <img src={logo} alt="logo" className={style.logo} />
            </Link>
          </div>
          <div className={style.navbar__upper__links}>
            <div className={style.link__container}>
              <NavLink
                exact
                to="/"
                className={style.link}
                activeClassName={style["link-selected"]}
              >
                Home
              </NavLink>
            </div>
            <div className={style["link__container"]}>
              <NavLink
                to="/freezers"
                className={style.link}
                activeClassName={style["link-selected"]}
              >
                Freezers
              </NavLink>
            </div>
            <div className={style["link__container"]}>
              <NavLink
                to="/racks"
                className={style.link}
                activeClassName={style["link-selected"]}
              >
                Racks
              </NavLink>
            </div>
            <div className={style["link__container"]}>
              <NavLink
                // Set the isActive to change container color
                to="/plates"
                className={style.link}
                activeClassName={style["link-selected"]}
              >
                Plates
              </NavLink>
            </div>
            <div className={style["link__container"]}>
              <NavLink
                to="/samples"
                className={style.link}
                activeClassName={style["link-selected"]}
              >
                Samples
              </NavLink>
            </div>
            <div className={style["link__container"]}>
              <NavLink
                to="/about"
                className={style.link}
                activeClassName={style["link-selected"]}
              >
                About
              </NavLink>
            </div>
          </div>
          <div className={style.navbar__upper__profile}>
            <ProfileButton />
          </div>
        </div>
        <form
          className={style.navbar__lower}
          onSubmit={handleSubmit}
          onReset={handleFormReset}
        >
          <Select
            options={freezerSearchOptions}
            styles={selectStyles}
            onChange={(e) => setSearchValue("freezer", e.value)}
            className={style["select-container"]}
            classNamePrefix="select-container"
            menuPlacement="bottom"
            placeholder="Freezer ID?"
            value={freezerId}
          />
          <Select
            options={rackSearchOptions}
            styles={selectStyles}
            onChange={(e) => setSearchValue("rack", e.value)}
            className={style["select-container"]}
            classNamePrefix="select-container"
            menuPlacement="bottom"
            placeholder="Rack ID?"
            value={rackId}
          />
          <Select
            options={plateSearchOptions}
            styles={selectStyles}
            onChange={(e) => setSearchValue("plate", e.value)}
            className={style["select-container"]}
            classNamePrefix="select-container"
            menuPlacement="bottom"
            placeholder="Plate ID?"
            value={plateId}
          />
          <Select
            options={sampleSearchOptions}
            styles={selectStyles}
            onChange={(e) => setSearchValue("sample", e.value)}
            className={style["select-container"]}
            classNamePrefix="select-container"
            menuPlacement="bottom"
            placeholder="Sample ID?"
            value={sampleId}
          />
          <button className={style.submit}>GO</button>
        </form>
      </nav>
    </div>
  );
}

export default Navigation;
