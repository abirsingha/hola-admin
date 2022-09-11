import React, {Fragment} from "react";

const NavItem = (props) => {
    return(
        <Fragment>
            <span><img src={props.src} alt="" /></span>{props.text}
        </Fragment>
    )
};

export default NavItem;