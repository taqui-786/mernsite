import React, { useContext } from 'react';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {userContext} from './App'
function Logout (){
    const {state,dispatch} = useContext(userContext)
const history   = useNavigate()
useEffect(()=>{
    fetch('/logout', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res)=>{ 
        dispatch({type:'USER', payload:false})
        history('/signin',{replace:true})
        if (res.status !== 304) {
            throw new Error("Error ...");
          }
      }).catch((err)=> {
        console.log(err);
      })
})

    return(<>
    <h1>LOGOUT PAGE..</h1>
    </>)
}
export default Logout 