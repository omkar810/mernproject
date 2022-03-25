import React from "react";
import './Home.css';
export default function Python() {
    return(
        <div className="syllabus">
            <h2 className="title">Python</h2>
            <h1>What you will learn</h1>
            <ul className="syll-flex">
                <li>The fundamental design cycle of computer science and computer programming: writing code, executing it, interpreting the results, and revising the code syntax based on the outcomes.</li>
                <li>Usage of the fundamental atoms of programming: variables, mathematical operators, logical operators, and boolean arithmetic.</li>
                <li>Control structures for developing dynamic programs, including Python libraries: conditionals, loops, functions, and error handling.</li>
                <li>The core data structures for creating useful programs: strings, lists, dictionaries, and file manipulation.</li>
                <li>Previews of the next big topics in computer science: object-oriented programming skills, and computer algorithms.</li>
            </ul>
        </div>
    )
}