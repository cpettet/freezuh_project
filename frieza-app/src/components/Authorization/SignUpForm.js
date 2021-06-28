import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session";
import style from "./forms.module.css";

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
      <div className={style.errors}>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className={style.form__button} type="submit">
        Sign Up
      </button>
      <div>
        Have an account? <Link to="/login">Log In</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
