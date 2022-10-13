import React, { useState } from "react";
import { useEffect } from "react";

import img from "./image/homepage.png"
function Home(){
    const [detail,setDetail] = useState({})
    const callContactPage = async () => {
        try {
          const res = await fetch("/getData", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const data = await res.json();
          setDetail(data)
          if (!res.status === 304) {
            throw new Error("Error ...");
          }
        } catch (err) {
          console.log(err);
          
        }
      };
      useEffect(() => {
        callContactPage();
      }, []);
    return (
        <>
        <div className="home">
        <div className="home_page ">
<form method="GET"></form>
<div className="content"><h5>Welcome</h5>
<h2>{detail.name}</h2>
<h1>We are the <span>MERN</span> Developer</h1></div>
<div className="img"><img src= {img} alt="" /></div>
</div>
        </div>
        </>
    )
}
export default Home