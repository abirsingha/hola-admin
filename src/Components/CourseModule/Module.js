import React from "react";
import { Link } from "react-router-dom";

const Module = (props) => {
    return(
        <div className="module">
            <div className="moduleVideo">
                <video width="100%" height="500px" controls>
                    <source src={props.src} type="video/mp4" />
                </video>
            </div>
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
            <Link to="/course-modules" className="backbtn">Go Back</Link>
        </div>
    )
}

export default Module;