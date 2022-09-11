import React from "react";
import Card from "../UI/Card";
import Message from "./Message";
import infoIcon from "../../Assests/info-icon.png";
import videoIcon from "../../Assests/video.png";
import video1 from "../../Assests/videos/7-strategies-to-run-a-business.mp4";
import video2 from "../../Assests/videos/10-tips-to-start-a-business.mp4";

const messageData = [
  {
    id: "a1",
    image: infoIcon,
    video: video1,
    title: "Welcome to Hola Business",
    message: "Watch this short intro to the course.",
  },
  {
    id: "a2",
    image: videoIcon,
    video: video2,
    title: "A message from the admin",
    message: "Watch this short intro to the course.",
  }
];

const messageList = messageData.map((singleMsg) => (
  <Message
    src={singleMsg.image}
    title={singleMsg.title}
    msg={singleMsg.message}
    key={singleMsg.id}
    id={singleMsg.id}
    data={messageData}
  />
));

const MessageBar = (props) => {

  return (
    <Card className={props.className}>
      <h4>Messages from Hola Business</h4>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-12">
          {messageList}
        </div>
      </div>
    </Card>
  );
};

export default MessageBar;
