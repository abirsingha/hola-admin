import React, { Fragment, useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import dashboardIcon from "../../Assests/white/dash.png";
import courseModule from "../../Assests/white/course-modules.png";
import businessPlan from "../../Assests/white/business-plan.png";
import financialPlan from "../../Assests/white/financial-plan.png";
import settings from "../../Assests/white/settings.png";
import help from "../../Assests/white/help-white.png";
import usefulResources from "../../Assests/white/useful-resources.png";
import logout from "../../Assests/white/logout.png";
import menuIcon from "../../Assests/menuicon.png";
import NavItem from "../UI/NavItem";
import MenuIcon from "../UI/MenuIcon";
import AuthContext from "../../Store/AuthContext";

const Leftbar = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleLeftbarHandler = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    const logoutHandler = () => {
        authCtx.logout();
        navigate('/');
    }
    const node = useRef();
    const clickOutside = (e) => { 
        if (node.current.contains(e.target)) { 
            setIsSidebarOpen(isSidebarOpen);
            return;
        }
        setIsSidebarOpen(false);
    }
    useEffect(() => {
        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside);
        }
    }, [isSidebarOpen]);

    return(
        <Fragment>
            <MenuIcon ref={node} src={menuIcon} onClick={toggleLeftbarHandler} text="Menu" />
            <div className={`leftBar ${isSidebarOpen ? "activeSidebar" : ""}`}>
                <ul>
                    <li><NavLink to="/dashboard"><NavItem text="Dashboard" src={dashboardIcon} /></NavLink></li>
                    <li><NavLink to="/course-modules"><NavItem text="Course Modules" src={courseModule} /></NavLink></li>
                    <li><NavLink to="/business-plan"><NavItem text="My Business Plan" src={businessPlan} /></NavLink></li>
                    <li><NavLink to="/settings"><NavItem text="Settings" src={settings} /></NavLink></li>
                    <li><NavLink to="/help"><NavItem text="Help" src={help} /></NavLink></li>
                    <li><NavLink to="/resources"><NavItem text="Useful Resources" src={usefulResources} /></NavLink></li>
                    <li onClick={logoutHandler}><NavLink to="/signup"><NavItem text="Logout" src={logout} /></NavLink></li>
                </ul>
            </div>
        </Fragment>
    )
};

export default Leftbar;
