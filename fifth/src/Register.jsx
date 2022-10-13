import React, { useState } from "react";
import r_img from "./image/register.png";
import { useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { MdEmail, MdWork, MdCall, MdOutlineSecurity } from "react-icons/md";

function Register() {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  function newData(e) {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  // GoPerson
  const Submit = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        work,
        email,
        password,
        cpassword,
      }),
    });
    await res.json();
    if (res.status === 422) {
      window.alert("Registeration Failed ");
    } else {
      window.alert("Successfully registered..");
      history("/signin");
    }
  };

  return (
    <>
      <div className="home">
        <div className="register">
          <h1>Register Now!</h1>
          <div className="register_page">
            <form method="POST" onSubmit={Submit}>
              <span>
                <GoPerson />
              </span>{" "}
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={newData}
                placeholder=" Name*"
                required
              />
              <span>
                <MdEmail />
              </span>{" "}
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={newData}
                placeholder=" Email*"
                required
              />
              <span>
                <MdCall />
              </span>{" "}
              <input
                type="number"
                name="phone"
                value={user.phone}
                onChange={newData}
                placeholder=" Number*"
                required
              />
              <span>
                <MdWork />
              </span>{" "}
              <input
                type="text"
                name="work"
                value={user.work}
                onChange={newData}
                placeholder="Work*"
                required
              />
              <span>
                <MdOutlineSecurity />
              </span>{" "}
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={newData}
                placeholder="Password*"
                required
              />
              <span>
                <MdOutlineSecurity />
              </span>{" "}
              <input
                type="password"
                name="cpassword"
                value={user.cpassword}
                onChange={newData}
                placeholder="Confirm Password*"
                required
              />
              <button className="r-btn" type="submit">
                Register
              </button>
            </form>
            <div className="r_img">
              <img src={r_img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
