import React from 'react';
import './Home.css';
import { UserContext } from '../App';
import {useContext} from 'react';
export default function Home() {
    const {state, dispatch} = useContext(UserContext);
    dispatch({type:"USER", payload: false});
    return (
        <div className='homet'>
            <h1>Welcome to E-learning</h1>
            <h2>Expand your <span>career opportunities</span></h2>
            <p className='para'>Skill up to success. E-learning is a leading destination for online courses that empowers you to grow professionally and personally.</p>
        </div>
         );
        }