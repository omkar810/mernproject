import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from '../App';

export default function Header() {
    const [showMenu,setShowMenu] = useState(false);
    const [userData, setUserData] = useState({});
    const {state, dispatch} = useContext(UserContext);
    const callHeader = async () =>{
        try{
             const res = await fetch('/Header', {
               method:"GET",
               headers:{
                 Accept: "application/json",
                 "Content-Type": "application/json"
               },
               credentials: "include"
             });
             const data = await res.json();
             console.log(data);
             setUserData(data);
    
             if (!res.status === 200) {
               const error = new Error(res.error);
               throw error;
             }
        } catch(err){
             console.log(err);
        }
      }
      useEffect(() => {
        callHeader();
      },[]);
    const DashHome =()=>{
        if(state){
            return(
                <li><Link to="/Dashboard" onClick={() =>setShowMenu(!showMenu)}>Dashboard</Link></li>
            );
        }
        else{
           return(
            <li><Link to="/" onClick={() =>setShowMenu(!showMenu)}>Home</Link></li>
           );
        }
    }
    const RenderMenu =()=>{
        if(state){
            return(
                <>
                <div class="dropdown">
                        <li class="dropbtn" id='white-bg'>{userData.fname} {userData.lname}&#x2B9F;</li>
                        <div class="dropdown-content" id='header-left'>
                             <div className='menu-dash' id='slim'>
                             <Link to="/Dashboard" onClick={() =>setShowMenu(!showMenu)}>Dashboard</Link>
                             <Link to="/CourseCart"  onClick={() =>setShowMenu(!showMenu)}>My Cources</Link>
                             <Link to="/Logout" onClick={() =>setShowMenu(!showMenu)}>Logout</Link>
                             </div>
                        </div>
                </div>
                </>
            )
        } else{
            return(
              <>
                <li className="green" id="green"><Link to="/login" onClick={() =>setShowMenu(!showMenu)}>Log in</Link></li>
                <li className="green" id="green"><Link to="/register" onClick={() =>setShowMenu(!showMenu)}>Register</Link></li>
              </>
            ) 
        }
    }
    return (
        <div className="navbar" id="nav">
            <h2 className="h2">
                <Link to="/">E-learning</Link>
            </h2>
            <div className={showMenu ? "menu-link m-nav" : "menu-link"}>
                <ul>
                    <DashHome />
                    <div class="dropdown" >
                        <li class="dropbtn">Cources</li>
                        <div class="dropdown-content">
                            <Link to="/Html" onClick={() =>setShowMenu(!showMenu)}>HTML5</Link>
                            <Link to="/Python" onClick={() =>setShowMenu(!showMenu)}>Python</Link>
                            <Link to="/Java" onClick={() =>setShowMenu(!showMenu)}>Java</Link>
                        </div>
                    </div>
                    <li><Link to="/About" onClick={() =>setShowMenu(!showMenu)}>About</Link></li>
                    <li><Link to="/Contact" onClick={() =>setShowMenu(!showMenu)}>Contact</Link></li>
                </ul>
            </div>
            <div className="burger">
                    <GiHamburgerMenu className="size" onClick={() =>setShowMenu(!showMenu)}/>
            </div>
            <div  className={showMenu ? "signup s-nav" : "signup"}>
                <ul className="signup-desktop">
                    <RenderMenu />
                </ul>
            </div>
        </div>
    );
}