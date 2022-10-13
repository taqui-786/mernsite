import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiUserShared2Fill } from "react-icons/ri";
import { ImMenu } from "react-icons/im";
import { useState } from "react";
import { userContext } from "./App";
function Navbar() {
  const {state,dispatch} = useContext(userContext);
  const [nav, setNav] = useState(true);

  const RenderMenu = () => {
    if (state) {
      return(
        <>
        <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            
              <li>
                <Link to="/logout">Logout</Link>
              </li>
      </>
      )
    }else{
        return(
            <>
             <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
              <li>
                <Link to="/signin">Login</Link>
              </li>
            </>
        )
    }
  };
  function ShowNav() {
    if (nav === true) {
      setNav(false);
    } else {
      setNav(true);
    }
  }
  return (
    <>
      <div className="navbar">
        <nav className="main">
          <div className="logo">
            
            <RiUserShared2Fill /> <span> TAQUI</span>
          </div>
          <div className="menu">
            <ul>
              <RenderMenu />
            
            </ul>
          </div>
          <div className="ham" onClick={ShowNav}>
            <ImMenu />
          </div>
        </nav>
        <div className={nav ? "none" : " mobile_menu main "}>
          <ul>
          <RenderMenu />
          </ul>
        </div>
      </div>
    </>
  );
}
export default Navbar;
