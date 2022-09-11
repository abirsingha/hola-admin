import React from "react";
import Card from "../UI/Card";
import welcomeImg from "../../Assests/welcome-img.png";

const WelcomeCard = (props) => {
    return(
        <Card className={props.className}>
            <h3>Hi! John</h3>
            <p>Let's get that business brain ticking...</p>
            <img src={welcomeImg} className="img-fluid" alt=""></img>
        </Card>
    )
}

export default WelcomeCard