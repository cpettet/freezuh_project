import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import style from "./forms.module.css";

const DemoUserButton = () => {
  const dispatch = useDispatch();

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@gmail.com", "password"));
  };

  return (
    <button className={style.form__button} onClick={demoUser}>
      Demo User
    </button>
  );
};

export default DemoUserButton;
