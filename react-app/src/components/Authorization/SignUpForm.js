import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session";
import style from "./forms.module.css";
import DemoUserButton from "./DemoUserButton";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    let data;
    if (password === repeatPassword) {
      data = await dispatch(signUp(username, email, password));
    }
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className={style["form__authorization"]} onSubmit={onSignUp}>
      <h3 className={style.form__header}>Signup for Freezuh</h3>
      <div className={style.errors}>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className={style.form__inputs}>
        <div className={style.form__inputs}>
          <label className={style.property__label}>Username</label>
          <input
            className={style.property__field}
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div className={style.form__inputs}>
          <label className={style.property__label}>Email</label>
          <input
            className={style.property__field}
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div className={style.form__inputs}>
          <label className={style.property__label}>Password</label>
          <input
            className={style.property__field}
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div className={style.form__inputs}>
          <label className={style.property__label}>Confirm Password</label>
          <input
            className={style.property__field}
            type="password"
            name="repeat_password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className={style.form__additional}>
          Have an account? <Link to="/login">Log In</Link>
        </div>
        <div className={style.form__buttons}>
          <button className={style.form__button} type="submit">
            Sign Up
          </button>
          <DemoUserButton />
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
