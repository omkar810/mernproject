// import logo from './logo.svg';
import './App.css';

import React, { createContext, useReducer } from 'react';
import Home from "./components/Home";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
// import Forgot from "./components/Forgot";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Python from "./components/Python";
import Html from "./components/Html";
import Java from "./components/Java";
import CourseCart from "./components/CourseCart";
import { Switch, Route } from "react-router-dom";
import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();
// const Routing = () =>{
//   return(
   
//   )
// }
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Header />
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Register">
        <Register />
      </Route>
      <Route path="/About">
        <About />
      </Route>
      <Route path="/Contact">
        <Contact />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
      {/* <Route path="/Forgot">
        <Forgot />
      </Route> */}
      <Route path="/Dashboard">
        <Dashboard />
      </Route>
      <Route path="/Logout">
        <Logout />
      </Route>
      <Route path="/Python">
        <Python />
      </Route>
      <Route path="/Html">
        <Html />
      </Route>
      <Route path="/Java">
        <Java />
      </Route>
      <Route path="/CourseCart">
        <CourseCart />
      </Route>
    </Switch>
      <Footer />
    </UserContext.Provider>
    
    </>
  )
};
export default App;
