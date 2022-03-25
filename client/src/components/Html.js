import React from "react";
import './Home.css';
export default function Html() {
    return(
        <div className="syllabus" id='html'>
            <h2 className="title">HTML5</h2>
            <h1>What you will learn</h1>
            <ul className="syll-flex">
                <li>Learn the simplified HTML5 elements</li>
                <li>Play with the audio and video elements</li>
                <li>Draw and animate fun Web graphics</li>
                <li>Discover the HTML5 forms features</li>
                <li>Test the basic APIs, such as Web storage and geolocation</li>
                <li>And most of all, practice coding techniques thanks to multiple interactive examples</li>
            </ul>
        </div>
    )
}