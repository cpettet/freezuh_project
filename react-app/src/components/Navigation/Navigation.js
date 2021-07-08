import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

  const [freezerId, setFreezerId] = useState("");
  const [rackId, setRackId] = useState("");
  const [plateId, setPlateId] = useState("");
  const [sampleId, setSampleId] = useState("");

  const setSearchValue = (type, item) => {
    if (type === "freezer") {
      setFreezerId(item[0]?.id);
      setRackId("");
      setPlateId("");
      setSampleId("");
    } else if (type === "rack") {
      setFreezerId("");
      setRackId(item[0]?.id);
      setPlateId("");
      setSampleId("");
    } else if (type === "plate") {
      setFreezerId("");
      setRackId("");
      setPlateId(item[0]?.id);
      setSampleId("");
    } else if (type === "rack") {
      setFreezerId("");
      setRackId("");
      setPlateId("");
      setSampleId(item[0]?.id);
    }
  };

  useEffect(() => {
    dispatch(getFreezers);
    dispatch(getRacks);
    dispatch(getPlates);
    dispatch(getSamples);
    setFreezerId("")
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (freezerId) {
      history.push(`/freezers/${freezerId}`);
    } else if (rackId) {
      history.push(`/racks/${rackId}`);
    } else if (plateId) {
      history.push(`/plates/${plateId}`);
    } else if (sampleId) {
      history.push(`/samples/${sampleId}`);
    } else {
      history.push("/about-me");
    }
  };

  return (
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
        </div>
        <div className={style.navbar__upper__profile}>
          <ProfileButton />
        </div>
      </div>
      <form className={style.navbar__lower} onSubmit={handleSubmit}>
        <div className={style["select-box"]}>
          <Select
            color="#6838A0"
            options={freezers}
            clearable={true}
            clearOnSelect={true}
            onChange={(value) => setSearchValue("freezer", value)}
            labelField="id"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Search by Freezer ID"
            className={style["select-box"]}
          />
        </div>
        <div className={style["select-box"]}>
          <Select
            color="#6838A0"
            options={racks}
            clearable={true}
            onChange={(value) => setSearchValue("rack", value)}
            labelField="id"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Search by Rack ID"
          />
        </div>
        <div className={style["select-box"]}>
          <Select
            color="#6838A0"
            options={plates}
            clearable={true}
            onChange={(value) => setSearchValue("plate", value)}
            labelField="id"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Search by Plate ID"
          />
        </div>
        <div className={style["select-box"]}>
          <Select
            color="#6838A0"
            options={samples}
            clearable={true}
            onChange={(value) => setSearchValue("sample", value)}
            labelField="id"
            separator={true}
            searchBy="id"
            keepSelectedInList={true}
            dropdownHeight="200px"
            placeholder="Select a Sample ID"
          />
        </div>
        <button className={style.submit}>GO</button>
      </form>
    </nav>
  );
}

export default Navigation;
