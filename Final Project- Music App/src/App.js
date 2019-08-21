import React, { Component } from "react";
//import Image from "react-native";
import "./App.css";
import "./stylesheet/style.css";

import firebase from "./config/Firebase";
import Login from "./loginRegister/Login";
import Home from "./loginRegister/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="app">
        <div className="registerLogin">
          {this.state.user ? <Home /> : <Login />}
        </div>
      </div>
    );
  }
}

export default App;
