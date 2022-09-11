import React from "react";

const BusinessCard = (props) => {
    return(
        <React.Fragment>
            <img src={props.src} alt="" className="img-fluid" />
            <h3>{props.name}</h3>
            <h2>{props.plan}</h2>
            <h5>{props.date}</h5>
            <h4><span>For</span>{props.forname}</h4>
            <ul>
                <li><span>Street Address:</span> {props.street}</li>
                <li><span>City:</span> {props.city}</li>
                <li><span>State/Province:</span> {props.state}</li>
                <li><span>ZIP Code:</span> {props.zip}</li>
                <li><span>Phone:</span> {props.phone}</li>
                <li><span>Email:</span> {props.email}</li>
                <li><span>Website:</span> {props.website}</li>
            </ul>
        </React.Fragment>
    )
}

export default BusinessCard;
