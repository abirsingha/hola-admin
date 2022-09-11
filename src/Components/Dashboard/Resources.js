import React from "react";
import Card from "../UI/Card";
import ResourceCard from "../Resources/ResourceCard";

const Resources = (props) => {
  return (
    <Card className={props.className}>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6">
          <div className="resourceHead mb-0">
            <h4>Resources:</h4>
          </div>
        </div>
      </div>
      <div className="resourcesInner">
        <ResourceCard />
      </div>
    </Card>
  );
};

export default Resources;
