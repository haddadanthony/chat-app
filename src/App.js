import React from "react";
import io from "socket.io-client";
import classes from "./App.module.css";

import StatusBar from "./Components/StatusBar/StatusBar";
import Message from "./Components/Message/Message";
import SendMessage from "./Components/SendMessage/SendMessage";

class App extends React.Component {
  state = {
    isConnected: false,
    persons: [],
    name: "",
    id: "",
    text: "",
    oldMessages: []
  };

  socket = null;

  changeHandler = e => {
    let attr = e.target.name;
    console.log(attr);
    if (attr === "name") {
      this.setState({
        name: e.target.value
      });
    } else if (attr === "text") {
      this.setState({
        text: e.target.value
      });
    }
  };

  submitHandler = e => {
    e.preventDefault();
    const message = {
      name: this.state.name,
      id: this.state.id,
      text: this.state.text
    };
    this.socket.emit("message", message);
    this.socket.emit("room_message");
    this.setState({text: ""});
  };

  componentWillMount = () => {
    this.socket = io(`https://codi-server.herokuapp.com`);

    this.socket.on("connect", () => {
      this.setState({ isConnected: true });
    });

    this.socket.on("youare", answer => {
      this.setState({
        id: answer.id
      });
    });

    this.socket.on("peeps", users => {
      this.setState({ persons: users }, () =>
        console.log(this.state.persons.length)
      );
    });

    this.socket.on("new connection", id => {
      console.log(id);
      let persons = [...this.state.persons];
      persons.unshift(id);
      this.setState({ persons });
    });

    this.socket.on("new disconnection", id => {
      let persons = [...this.state.persons];
      persons.shift(id);
      this.setState({ persons });
    });

    this.socket.on("pong!", data => {
      data.data = this.state.persons;
      console.log("the server answered!", data);
    });

    this.socket.on("disconnect", () => {
      this.setState({ isConnected: false });
    });

    this.socket.on("next", next_from_server => console.log(next_from_server));

    this.socket.on("room", old_messages => {
      this.setState({ oldMessages: old_messages });
    });

    this.socket.emit("whoami");
  };

  componentWillUnmount = () => {
    this.socket.close();
    this.socket = null;
  };

  render() {
    return (
      <div className={classes.App}>
        <StatusBar
          change={this.changeHandler}
          name={this.state.name}
          connected={this.state.isConnected}
        />
        <Message name={this.state.name} messages={this.state.oldMessages} />
        <SendMessage
          change={this.changeHandler}
          submit={this.submitHandler}
          text={this.state.text}
        />
        <footer><p>Developed by Anthony Haddad&#169;</p></footer>
      </div>
    );
  }
}

export default App;
