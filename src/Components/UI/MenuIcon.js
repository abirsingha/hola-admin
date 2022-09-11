import React from "react";

const MenuIcon = React.forwardRef((props, ref) => {
    return(
        <button type="button" ref={ref} onClick={props.onClick} className="sidebarCollapse">
            <span>
                <img src={props.src}  alt=""/> {props.text}
            </span>
        </button>
    )
})

export default MenuIcon;
