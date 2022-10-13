// const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const Authenticate = require('../middleware/authenticate')
require("../db/conn");
const user = require("../model/userSchema");
 
// HOME PAGE 
// router.get("/", (req, res) => {
//   // res.cookie("taqui","imam")
//   res.send("Home page from router side..");
// });

// REGISTER BACKEND 

router.post("/register", async (req, res) => {
  const { name, phone, work, email, password, cpassword } = req.body;

  if (!name || !phone || !work || !email || !password || !cpassword) {
    return res.status(422).json({ error: "please fill the given detail." });
  }
try{
const userExist = await user.findOne({ email: email })

if (userExist) {

  return res.status(422).json({ error: "Email already exist..." });
  }else if(password != cpassword){
    return res.status(422).json({ error: " Password and Cpassword are not same..." });
  }else{
    const User = new user({ name, phone, work, email, password, cpassword });
    await User.save()
    res.status(201).json({ message: "SUCCESSFULY saved ..." });
  }
 

}catch(err){console.log(err);}
});

// Login backend 
let token;
router.post('/login' , async(req,res) =>{
  try{
   const { email , password} = req.body
  if(!email || !password){
    return res.status(402).json({"error":"Please fill the data ...."})
  }
  const userLogin = await user.findOne({email:email})

  if(userLogin){ 
    const isMatch = await bcrypt.compare(password,userLogin.password)
    token = await userLogin.generateAuthToken()
   
// COOKIES 
res.cookie('jwtoken',token,{
  expires: new Date(Date.now() + 25892000000),
  httpOnly:true
})

    if(!isMatch){
      res.status(402).json({"error":"Invalid Password.."})
    }else{
       res.status(200).json({"message":"LOGIN SUCCESSFULY."})
    }
  }else{
    res.status(402).json({"error":"Invalid Email.."})
  }
 
 }catch(err){
  console.log(err)
 }
})
// About page backend 

router.get('/about',  Authenticate,(req,res) =>{
  res.send(req.rootUser)
  // console.log("About page..")
})
// Contact page backend 
router.post('/contact',Authenticate,async (req,res)=>{
  try{
    const {name,email,phone,message} = req.body;
    if(!name || !email || !phone || !message ){
console.log("erro in contact form")
return res.json({"error":"please fill the proper data.."});
}
const userContact = await user.findOne({_id: req.userID})
if(userContact){
  const userMessage = await userContact.addMessage(name,email,phone,message)
  await userContact.save()
  res.status(201).json({"messages":"Message sent successfully..."})
}


  }catch(err){
    console.log(err);
  }
})




// Data display  page backend 
router.get('/getData',Authenticate,(req,res) =>{
  res.send(req.rootUser)
  // console.log("About page..")
})
// home page backend 
router.get('/home',  Authenticate,(req,res) =>{
  res.send(req.rootUser)
  // console.log("About page..")
})
// LOGOUT backend 
router.get('/logout', (req,res) =>{
  console.log("logout page..")
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send("user Logout..")
})



module.exports = router;
