import React from "react";
import MessageList from "./MessageList";
import classes from "./Message.module.css";

const Message = props => {
  return (
    <div className={classes.container}>
      <MessageList messages={props.messages} name={props.name} />
    </div>
  );
};

export default Message;
