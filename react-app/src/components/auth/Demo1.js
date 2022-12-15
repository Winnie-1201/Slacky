import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./LoginLogout.css";

function DemoUser1() {
  const dispatch = useDispatch();


  const DemoLogin =  (e) => {

      e.preventDefault();

    const email = 'demo1@aa.io';
    const password = 'password'

    return dispatch(login(email, password));
    }



  return (

      <div className="user-form-button-div">
        <button onClick={DemoLogin}

          type="submit"
        >
          Demo1 Login
        </button>
      </div>

  );
}

export default DemoUser1;
