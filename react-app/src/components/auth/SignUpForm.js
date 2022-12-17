import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import LoginGeneral from "./LogIn/LoginGeneral";

import "./LoginLogout.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [hasSubmit, setHasSubmit] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmit(true);

    if (errors.length) return;

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  useEffect(() => {
    const newErrors = [];

    if (password !== repeatPassword) {
      newErrors.push("Please enter the same password");
    }

    if (username === "") {
      newErrors.push("Please enter your username.");
    }

    if (email === "") {
      newErrors.push("Please enter your email.");
    }

    if (password === "") {
      newErrors.push("Please enter the password.");
    }

    if (repeatPassword === "") {
      newErrors.push("Please confirm your password.");
    }

    setErrors(newErrors);
  }, [repeatPassword, username, email, password]);

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/channels/1" />;
  }

  return (
    <>
      <LoginGeneral />
      <form onSubmit={onSignUp} className="user-form">
        <div className="form-error-container">
          {hasSubmit && errors.map((error, ind) => (
            <div key={ind} className="form-error-block">
              {error}
            </div>
          ))}
        </div>
        <div className="user-form-inputs-div">
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            placeholder="Username"
          ></input>
        </div>
        <div className="user-form-inputs-div">
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            placeholder="Email"
          ></input>
        </div>
        <div className="user-form-inputs-div">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="user-form-inputs-div">
          <input
            type="password"
            name="repeat_password"
            placeholder="Confirm Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            // required={true}
          ></input>
        </div>
        {/* {errors.samePv && <p>{errors.samePv}</p>} */}
        <div className="user-form-button-div">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
