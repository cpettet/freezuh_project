import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import style from "./forms.module.css";

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
      <div className={style.errors}>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className={style.form__inputs}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={style.form__button} type="submit">
            Login
          </button>
          <div>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
