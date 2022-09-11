import React, { useState } from "react";

const NotificationCard = (props) => {
  const [isShow, setIsShow] = useState('');
  const viewNotificationHandler = (event) => { 
    event.preventDefault();
    setIsShow(!isShow);
  }

  return (
    <div className="col-md-12">
      <div className="notification d-flex align-items-center">
        <div className="notification-icon"><img src={props.src} alt="" width="25px" /></div>
        <div className="notification-cont">
          <h4>{props.title}</h4>
          <p className={`${isShow ? "show" : ""}`}>{props.desc}</p>
        </div>
        <div className="notification-btn ml-auto">
          <button type="button" onClick={viewNotificationHandler}>View</button>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard;
