import React, { createContext } from 'react';
import {  Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Register from './Register'
import Login from './Login'
import Logout from './logout'
import { useReducer } from 'react';
import { initial , reducer } from './reduce file/reducer';

export const userContext = createContext()
function App() {
const [state,dispatch]= useReducer(reducer,initial)
  return (
 <>
 <userContext.Provider value={{state,dispatch}}>
 <Navbar/>
 <Routes>
  <Route exact path='/' element={<Home/>}/>
  <Route exact path='/about' element={<About/>}/>
  <Route exact path='/contact' element={<Contact/>}/>
  <Route exact path='/signup' element={<Register/>}/>
  <Route exact path='/signin' element={<Login/>}/>
  <Route exact path='/logout' element={<Logout/>}/>
 </Routes>
 </userContext.Provider>


 </>
  );
}

export default App;
