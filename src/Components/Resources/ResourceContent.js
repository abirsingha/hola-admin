import React from "react";
import InfoText from "../UI/InfoText";
import Wrapper from "../UI/Wrapper";
import ResourceCard from "./ResourceCard";

const ResourceContent = () => {
    return(
        <Wrapper>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <InfoText text="Resource Links" />
                    </div>
                </div>
                <ResourceCard />
            </div>
        </Wrapper>
    );
}

export default ResourceContent;
