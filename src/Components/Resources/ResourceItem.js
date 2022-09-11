import React from "react";

const ResourceItem = (props) => {
    return(
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12">
                <div className="resourceCard">
                    <div className="resourceName mr-auto">
                        <img src={props.src} alt=""/>
                        <h5>{props.heading}</h5>
                    </div>
                    <div className="resourceOpen">
                        <a href={props.href} target={props.target}>{props.btntext}</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ResourceItem;