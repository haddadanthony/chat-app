import React from "react";
import styled, { keyframes } from "styled-components";
import classes from "./Message.module.css";


const Div = styled.div`
  padding: 10px;
  background: #fff;
  box-shadow: 0 4px 7px
    ${props => (props.name === props.user ? "lightgreen" : "lightblue")};
  width: 80%;
  margin: 25px;
  border-radius: 5px;
  transition: .5s;
  margin-left: ${props => (props.name === props.user ? "auto" : "none")};
  &:hover {
    transform: scale(1.03);
    transition: .5s;
  }
`;

const Name = styled.h5`
  padding: 10px;
  margin: 0;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    ${props => (props.name === props.user ? "#50c878" : "lightblue")},
    #fff
  );
  width: 100%;
  font-size: 2rem;
  color: #4a4a4a;
  font-weight: 700;
  text-transform: capitalize;
`;

const MessageList = props => {
  const { messages, name } = props;

  return (
    <>
      {messages.map((message, index) => (
          <Div key={index} name={name} user={message.name}>
            <Name name={name} user={message.name}>
              {message.name}
            </Name>
            <p className={classes.text}>{message.text}</p>
            <p className={classes.date}>{message.date}</p>
          </Div>
      ))}
    </>
  );
};

export default MessageList;
