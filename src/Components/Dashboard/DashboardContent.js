import React from "react";
import InfoText from "../UI/InfoText";
import MessageBar from "../Dashboard/MessageBar";
import Modules from "../Dashboard/Modules";
import Resources from "../Dashboard/Resources";
import WelcomeCard from "../Dashboard/WelcomeCard";
import Wrapper from "../UI/Wrapper";

const DashboardContent = (props) => {
    return(
        <Wrapper>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <InfoText text="Overview" />
                                <WelcomeCard className="welcomeCard" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <Modules modules={props.data} className="moduleWrap" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <Resources className="resourceWrap" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                        <MessageBar className="messageBar" />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default DashboardContent;
