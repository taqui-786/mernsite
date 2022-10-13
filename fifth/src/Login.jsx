import React, { useContext } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdOutlineSecurity } from "react-icons/md";
import l_img from "./image/login.png";
import {userContext} from './App'
function Login() {
  const {state,dispatch} = useContext(userContext)
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 402 || !data) {
      window.alert("Login failed");
    } else {
      window.alert("Login successful..");
      dispatch({type:'USER', payload:true})
      history("/");
    }
  };

  return (
    <>
      <div className="home">
        <div className="login">
          <h1>Login Now!</h1>
          <div className="login_page">
          <div className="l_img">
              <img src={l_img} alt="" />
            </div>
            <form method="POST" onSubmit={submit}>
              <span>
                <MdEmail />
              </span>
              <input
                type="email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email*"
              />
              <span>
                <MdOutlineSecurity />
              </span>
              <input
                type="password"
                placeholder="Password*"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="l-btn">
                Login
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
