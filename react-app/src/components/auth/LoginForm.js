import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import LoginGeneral from "./LogIn/LoginGeneral";
import DemoUser1 from "./Demo1"
import DemoUser2 from "./Demo2"

import "./LoginLogout.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    setEmail('')
    setPassword('')
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/channels/1" />;
  }

  return (
    <>
      <LoginGeneral />
      <form onSubmit={onLogin} className="user-form ">
        <div className="form-error-container">
          {errors.map((error, ind) => (
            <div key={ind} className="form-error-block">
              {error}
            </div>
          ))}
        </div>
        <div className="user-form-inputs-div">
          {/* <label htmlFor='email'>Email</label> */}
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="user-form-inputs-div">
          {/* <label htmlFor='password'>Password</label> */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="user-form-button-div">
          <button type="submit">Login</button>
        </div>

      <div className="user-form-button-div">
          <DemoUser1 />
      </div>
      <div className="user-form-button-div">
      <DemoUser2 />
      </div>


       
      </form>
    </>
  );
};

export default LoginForm;
