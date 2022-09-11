import React from "react";
import ProgressBar from "./ProgressBar";

const ModuleContent = (props) => {
    return(
        <div className="moduleCont">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-5 col-lg-4">
                    <div className="modulevideo">
                        <video width="100%" height="210px" controls>
                            <source src={props.src} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-7 col-lg-8">
                    <div className="moduleCardCont">
                        <h1>{props.title}</h1>
                        <p>{props.desc}</p>
                    </div>
                    <div className="progressWrap">
                        <ProgressBar label="Your progress" {...props} btntext="Continue" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModuleContent;
