import React from "react";
import classes from "./SendMessage.module.css";

const SendMessage = props => {
  const { submit, change, text } = props;

  return (
    <form onSubmit={e => submit(e)} className={classes.container}>
      <input name="text" onChange={e => change(e)} value={text} placeholder="Your message here..." />
      <button className={classes.send}>Send</button>
    </form>
  );
};

export default SendMessage;
