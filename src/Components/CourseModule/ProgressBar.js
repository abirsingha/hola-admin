import React from "react";
import { Link } from "react-router-dom";

const ProgressBar = (props) => {
    return(
        <div className="row">
            <div className="col-12 col-sm-8 col-md-8 col-lg-9">
                <label>{props.label}</label>
                <div className="progressBar">
                    <div className="progress"></div>
                </div>
            </div>
            <div className="col-12 col-sm-4 col-md-4 col-lg-3">
                <div className="progressBtn">
                    <Link to={`/module-detail/${props.id}`}>{props.btntext}</Link>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;
