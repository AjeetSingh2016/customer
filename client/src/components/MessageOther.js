import React from "react";
import moment from 'moment'

const MessageOther = ({ text, time,  isSelf }) => {
  const messageClass = isSelf ? "self-message" : "other-message";

  const messageDetails = isSelf ? "self-message-details" : "other-message-details";

  const formattedDate = moment(time).calendar(); ;

  return (
    <div className={`message ${messageClass}`}>
      <div className={`message-text`}>{text}</div>
      <div className={`message-details ${messageDetails}`}>
        <div className="message-time">{formattedDate}</div>
      </div>
    </div>
  );
};

export default MessageOther;
