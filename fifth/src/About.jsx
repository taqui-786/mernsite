import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import a_img from './image/aboutpage.png'

function About(){
    const [detail , setDetail] = useState({})
    const history = useNavigate()
const callAboutPage =async () =>{
try{
const res = await fetch('/about',{
    method:'GET',
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    credentials:"include"
})
const data = await res.json();
setDetail(data)
if(!res.status === 304){
    throw new Error(res.error)
}


}catch(err){ console.log(err);
    history('/signin')
}
}

    useEffect(() =>{
        callAboutPage()
    },[])
    
    return(
        <>
    <div className="home">
    <div className="about">
        <form method="GET"></form>
        <div className="about_page">
            <div className="a_content">
                <ul>
              <li>  <p>Hello My Name Is <span id="name">{detail.name}</span></p></li>
            <li> <p>I Am A <span id="mern">{detail.work} </span> Stack Developer .</p></li> 
            <li><p>You can Contact me from MY Phone Number <span id="number">{detail.phone}</span></p></li> 
            <li><p>Or Email me on <span id="email"> {detail.email}</span></p></li>
                </ul>
        
            </div>
        </div>
        <div className="a_img"><img src={a_img} alt="" /></div>
     </div>
    </div>
        </>
    )
}
export default About