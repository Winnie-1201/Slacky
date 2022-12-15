import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./LoginLogout.css";

function DemoUser2() {
  const dispatch = useDispatch();


  const DemoLogin = async (e) => {

      e.preventDefault();

      const email = 'demo2@aa.io';
      const password = 'password'

      return dispatch(login(email, password));



  };

  return (

      <div className="user-form-button-div">
        <button onClick={DemoLogin}

        type="submit"
        >
          Demo2 Login
        </button>
      </div>

  );
}

export default DemoUser2;
