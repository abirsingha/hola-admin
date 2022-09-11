import React, { useState } from "react";
import ReactDom from "react-dom";
import Backdrop from "../UI/Backdrop";
import VideoModal from "../UI/VideoModal";
import arrowIcon from "../../Assests/btn-arrow.png";

const Message = (props) => {
    const [show, setShow] = useState(false)
    const [messageData, setMessageData] = useState({});
    
    const showVideoHandler = (event) => {
        event.preventDefault();
        setShow(true);
        const btnId = props.id;
        const message = props.data.find((v) => v.id === btnId)
        setMessageData(message);
    }

    const closeModalHandler = () => { 
        setShow(false);
    }

    return (
        <>
            {show && ReactDom.createPortal(<Backdrop onClick={closeModalHandler} />, document.getElementById('backdrop'))}
            {show && ReactDom.createPortal(<VideoModal data={messageData} onClick={closeModalHandler} />, document.getElementById('overlay')) }
            <div className="messageCard">
                <div className="messagePlaceholder">
                    <img src={props.src} className="img-fluid" alt="" />
                </div>
                <div className="messageInfo">
                    <h4>{props.title}</h4>
                    <p>{props.msg}</p>
                    <button type="button" id={props.id} onClick={showVideoHandler} className="btn">Watch <img src={arrowIcon} /></button>
                </div>
            </div>
        </>
    )
}

export default Message;