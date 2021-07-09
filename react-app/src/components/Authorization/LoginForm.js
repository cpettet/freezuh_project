import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import style from "./forms.module.css";
import DemoUserButton from "./DemoUserButton";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className={style["form__authorization"]} onSubmit={onLogin}>
      <h3 className={style.form__header}>Login to Freezuh</h3>
      <div className={style.errors}>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className={style.form__inputs}>
        <div>
          <label htmlFor="email" className={style.property__label}>
            Email
          </label>
          <input
            className={style.property__field}
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className={style.property__label}>
            Password
          </label>
          <input
            className={style.property__field}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={style.form__additional}>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </div>
          <div className={style.form__buttons}>
            <button className={style.form__button} type="submit">
              Login
            </button>
            <DemoUserButton />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
