import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import style from "./ProfileButton.module.css";
import { logout } from "../../store/session";
import userUnknown from "./User-Icon-Unknown.svg";
import userIcon from "./User-Icon.svg";

function ProfileButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  });

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <button
        className={style["profile__button"]}
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <div className={style["profile__button__container"]}>
          {user && (
            <img src={userIcon} alt="user" className={style["profile-image"]} />
          )}
          {!user && (
            <img
              src={userUnknown}
              alt="not-user"
              className={style["profile-image"]}
              onClick={() => history.push("/login")}
            />
          )}
        </div>
      </button>
      {showMenu && user && (
        <ul className={style["profile-dropdown"]}>
          <li className={style["profile-dropdown__item"]}>{user.username}</li>
          <li className={style["profile-dropdown__item"]}>
            <button onClick={onLogout}>Sign Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
