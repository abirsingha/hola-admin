import React from "react";
import NotificationCard from "./NotificationCard";
import notifyIcon from "../../Assests/notifications-icon.png";


const NOTIFICATIONDATA = [
  {
    title: 'Profile password has been changed.',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    src: notifyIcon,
    id: 'n1'
  },
  {
    title: 'Business plan has been updated.',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    src: notifyIcon,
    id: 'n2'
  },
  {
    title: 'Support ticket has been raised.',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    src: notifyIcon,
    id: 'n3'
  }
]

const notificationList = NOTIFICATIONDATA.map((notify) => (<NotificationCard title={notify.title} desc={notify.desc} src={notify.src} key={notify.id} /> ))

const Notification = () => { 
  return (
    <div className="row">
      {notificationList}
    </div>
  )
}

export default Notification;
