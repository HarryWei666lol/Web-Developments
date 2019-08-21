import React, { Component } from "react";
import firebase from "../config/Firebase";

class Login extends Component {
  constructor(props) { // constructor for the variables 
    super(props);
    this.state = {
      email: "",
      password: "",
      registerEmail: "",
      registerPassword: "",
      verifyPassword: ""
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) { // update states when variable is changed
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) { // user logs in 
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        window.alert(error);
      });
  }

  register(e) {// user registers
    e.preventDefault();
    if (this.state.registerPassword !== this.state.verifyPassword) {
      window.alert(
        "password input has to be the same as verified password input"
      );
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.registerEmail,
          this.state.registerPassword
        )
        .then(u => {
          console.log(u);
        })
        .catch(error => {
          window.alert(error);
        });
    }
  }

  render() { // return those info that will be displayed
    return (
      <div className="account">
        <div className="login">
          <form>
            <div className="login-div">
              <h3>Login Page</h3>
              <input
                name="email"
                type="email"
                placeholder="Email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <button onClick={this.login}>Login to Account</button>
            </div>
          </form>
        </div>

        <div className="register">
          <form>
            <div className="register-div">
              <h3>Register Page</h3>
              <input
                name="registerEmail"
                type="email"
                placeholder="Email"
                id="registerEmail"
                value={this.state.registerEmail}
                onChange={this.handleChange}
              />
              <input
                name="registerPassword"
                type="password"
                placeholder="Password"
                id="registerPassword"
                value={this.state.registerPassword}
                onChange={this.handleChange}
              />
              <input
                name="verifyPassword"
                type="password"
                placeholder="Verify Password"
                id="verifyPassword"
                value={this.state.verifyPassword}
                onChange={this.handleChange}
              />
              <button onClick={this.register}>Register An Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
