import React from "react";
import Wrapper from "../UI/Wrapper";
import InfoText from "../UI/InfoText";
import ModuleContent from "./ModuleContent";

const CourseModules = (props) => {
  const moduleList = props.modules.map((module) => (
    <ModuleContent
      src={module.src}
      title={module.title}
      desc={module.description}
      key={module.id}
      id={module.id}
    />
  ));
  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="infoText">
              <InfoText text="Jump right in" />
            </div>
          </div>
        </div>
          {moduleList}
      </div>
    </Wrapper>
  );
};

export default CourseModules;
