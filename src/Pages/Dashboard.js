import React from "react";
import DashboardContent from "../Components/Dashboard/DashboardContent";

const Dashboard = (props) => {
    return (
        <DashboardContent data={props.data} />
    )
};

export default Dashboard;
