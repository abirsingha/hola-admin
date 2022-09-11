import React from "react";
import CourseModules from "../Components/CourseModule/CourseModules";

const CourseModule = (props) => {
    return(
        <CourseModules modules={props.data} />
    )
}

export default CourseModule;

