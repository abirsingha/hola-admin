import React from "react";

const Backdrop = (props) => {
  const dismissBackdrop = () => { 
    props.onClick();
  }
  return (
    <div className="backdrop" onClick={dismissBackdrop} />
  )
}

export default Backdrop;