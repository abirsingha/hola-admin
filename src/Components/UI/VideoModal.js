import React from "react"
import closeIcon from "../../Assests/close-icon.png";

const VideoModal = (props) => {
  const dismissModal = () => { 
    props.onClick();
  }

  return (
    <div className="video-modal">
      <div className="close-btn" onClick={dismissModal}><img src={closeIcon} alt=""/></div>
      <video width="500px" height="350" controls autoPlay={true}>
        <source src={props.data.video} />
      </video>  
    </div>
  )
}
export default VideoModal;
