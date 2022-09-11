import React from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../UI/Wrapper";
import Module from "./Module";

const ModuleDetail = (props) => {
    const param = useParams()
    const id = param.moduleId;
    const module = props.data.find((p) => (p.id === id));
    return (
        <Wrapper>
            <Module src={module.src} title={module.title} desc={module.description} />
        </Wrapper>
    );
};

export default ModuleDetail;
