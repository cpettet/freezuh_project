import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogOutButton = () => {
    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(logout());
    };

    return <button onClick={onLogOut}>Logout</button>
};

export default LogOutButton;