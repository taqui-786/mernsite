import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import c_img from "./image/contactpage.png";
import { GoPerson } from "react-icons/go";
import { MdEmail, MdCall } from "react-icons/md";
import { useEffect } from "react";
function Contact() {
  
    const [detail,setDetail] = useState({name:"", email:"", phone:"",message:""})
  const history = useNavigate();
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
    //  console.log(data);
      setDetail({...detail,name:data.name, email:data.email, phone:data.phone})
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
  let name , value
  function newValue(e){
 name = e.target.name;
value = e.target.value;

setDetail({...detail,[name]: value})

  }
  const submit =async (e) =>{
    e.preventDefault()
    
    const {name,email,phone,message} = detail;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        message,
        
      }),
    });
    const cData = await res.json();
    if (!cData) {
      window.alert(" Failed ");
      console.log("Failed")
    } else {
      console.log("submitted")
      setDetail({...detail,message: ""})
      window.alert("Subimitted ..");
      
    }
  }

  return (
    <>
      <div className="home">
        <div className="contact">
          <div className="contact_page">
            <form method="POST"  onSubmit={submit}>
              <span>
                <GoPerson />
              </span>
              <input type="text" placeholder="Enter you Name" name="name" value={detail.name} onChange={newValue} />
              <span>
                <MdEmail />
              </span>
              <input type="email" placeholder="Enter you Email"  name="email" value={detail.email} onChange={newValue} />
              <span>
                <MdCall />
              </span>
              <input type="number" placeholder="Enter you Number"  name="phone" value={detail.phone} onChange={newValue} />

              <textarea
                name="message"
                id=""
                cols="30"
                rows="10"
                value={detail.message}
                placeholder=" Enter Your Message!" onChange={newValue}
              />
            <button className="c-btn">SUBMIT</button>
            </form>
          </div>
          <div className="c_img">
            <img src={c_img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
