import React from "react";
import { Link } from "react-router-dom";

const ModuleCard = (props) => {
    return(
        <div className="moduleCard">
            <div className="moduleImg">
                <video width="100%" height="210px" controls>
                    <source src={props.src} type="video/mp4" />
                </video>
            </div>
            <hr/>
            <div className="moduleBody">
                <h4 title={props.heading}>{props.heading}</h4>
                <p>
                    {props.desc}
                </p>
                <ul className="pLink">
                <li><span>{props.percent}</span></li>
                <li><Link to="/course-modules" className="active">{props.btntext}</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default ModuleCard;
