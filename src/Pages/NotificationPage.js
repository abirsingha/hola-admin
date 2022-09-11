import React from "react";
import Wrapper from "../Components/UI/Wrapper";
import Notification from "../Components/Notification/Notification";

const NotificationPage = () => { 
  return (
    <Wrapper>
      <div className="container-fluid">
          <Notification />
      </div>
        
    </Wrapper>
  )
}

export default NotificationPage;