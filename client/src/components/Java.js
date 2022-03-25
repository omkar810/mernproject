import React from "react";
import './Home.css';
export default function Java() {
    return(
        <div className="syllabus">
            <h2 className="title">Java</h2>
            <h1>What you will learn</h1>
            <ul className="syll-flex">
               <li>Develop simple programs in Java making use of conditionals, loops, and recursion
               </li>
               <li>Understand basic mechanisms of the OOP paradigm, as well as use the API of some of the most common Java classes</li>
               <li>Detect and correct common programming errors at compile time and runtime</li>
               <li>Compare the efficiency of programs in terms of resources used</li>
               <li>Model simple programs using basic software engineering techniques</li>
               <li>Develop and use basic data structures including lists, stacks, queues and trees</li>
               <li>Develop and use linear and non-linear data structures and implement algorithms for efficient searching and sorting of data</li>
            </ul>
        </div>
    )
}