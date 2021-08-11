import React from "react";
import style from "./Splash.module.css";
import { Link } from "react-router-dom";
import freezer from "./Freezer-Final.min.svg";
import plate from "./Plate-Finalv2.min.svg";
import rack from "./Rack-Final.min.svg";
import sample from "./Sample-Tube-Final.min.svg";

function Splash() {
  return (
    <div className={style.splash__container}>
      <h1 className={style.splash__header}>
        Welcome to Freezuh, Final Transformation
      </h1>
      <p>
        New here? Check the links below or the{" "}
        <Link to="/about">about page. </Link>
        <Link to="/login">Have an account? </Link>
        <Link to="/sign-up">Want an account?</Link>
      </p>
      <div className={style.link__container}>
        <Link to="/freezers">
          <img src={freezer} alt="freezers" className={style.image} />
        </Link>
        <Link to="/racks">
          <img src={rack} alt="racks" className={style.image} />
        </Link>
        <Link to="/plates">
          <img src={plate} alt="plates" className={style.image} />
        </Link>
        <Link to="/samples">
          <img src={sample} alt="samples" className={style.image} />
        </Link>
      </div>
    </div>
  );
}

export default Splash;
