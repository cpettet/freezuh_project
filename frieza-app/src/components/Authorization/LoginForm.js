import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import style from "./forms.module.css";

const LoginForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password))
        if (data.errors) {
            setErrors(data.errors);
        }
    };

    if (user) {
        return <Redirect to ="/" />;
    }

    return (
        <div className={style["form__authorization"]}>
            Hello, world
        </div>
    )
}

export default LoginForm;