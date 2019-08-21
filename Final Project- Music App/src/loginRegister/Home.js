import React, { Component } from "react";
import firebase from "../config/Firebase";
import "firebase/database";
import MusicList from "../musics/MusicList";
import AddMusic from "../musics/AddMusic";
import GetMusicNum from "../musics/GetMusicNum";
import WishMusic from "../musics/WishMusic";
import SearchMusic from "../musics/SearchMusic";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Pic } from "./Pic";
import "../stylesheet/style.css";

class Home extends Component {
  constructor(props) { // set up variables and database in the constructor 
    super(props);
    this.user = firebase.auth().currentUser;
    if (this.user != null) {
      this.userid = this.user.uid;
    }
    this.logout = this.logout.bind(this);
    this.addMusic = this.addMusic.bind(this);

    this.database = firebase
      .database()
      .ref()
      .child("musics");
    this.state = {
      allMusics: []
    };
  }

  componentDidMount() { 
    // get the values and states if a user is logged in
    const previousMusics = this.state.allMusics;
    this.database.on("child_added", snap => {
      if (snap.val().userid === this.userid) {
        previousMusics.push({
          musicid: snap.key,
          musicName: snap.val().musicName,
          musicDate: snap.val().musicDate,
          musicType: snap.val().musicType,
          musicSinger: snap.val().musicSinger,
          musicAlbum: snap.val().musicAlbum,
          userFavorite: snap.val().userFavorite,
          userid: this.userid,
          musicComment: snap.val().musicComment
        });
        this.setState({
          allMusics: previousMusics
        });
      }
    });
  }

  logout() { // log out of firebase
    firebase.auth().signOut();
  }

  addMusic(newMusic) { // user adds a music
    const userID = this.userid;
    this.database.push().set({
      musicid: this.state.allMusics.length,
      musicName: newMusic.musicName,
      musicDate: newMusic.musicDate,
      musicType: newMusic.musicType,
      musicSinger: newMusic.musicSinger,
      musicAlbum: newMusic.musicAlbum,
      userFavorite: false,
      userid: "" + userID,
      musicComment: newMusic.musicComment
    });
  }

  render() { // return those to be displayed
    return (
      <div className="home" id="home">
        <Router>
          <div className="route-container">
            <Pic />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <GetMusicNum {...props} userid={this.userid} />
                )}
              />

              <Route
                path="/list/:filter"
                render={props => <MusicList {...props} userid={this.userid} />}
              />
              <Route
                path="/list"
                render={props => <MusicList {...props} userid={this.userid} />}
              />
              <Route
                path="/add"
                render={props => (
                  <AddMusic {...props} newMusic={this.addMusic} />
                )}
              />
              <Route
                path="/wishList"
                render={props => <WishMusic {...props} userid={this.userid} />}
              />
              <Route
                path="/search"
                render={props => (
                  <SearchMusic {...props} allMusics={this.state.allMusics} />
                )}
              />
            </Switch>
          </div>
        </Router>
        <div className="otherFeatures">
          <div className="musicNames">
            <a
              href="http://ec2-18-222-248-75.us-east-2.compute.amazonaws.com/~xcao22/creative/names.html"
              target="_blank"
            >
              Music Names Cloud
            </a>
          </div>
          <div className="musicPlay">
            <a
              href="http://ec2-18-222-248-75.us-east-2.compute.amazonaws.com/~xcao22/creative/musicPlay.html"
              target="_blank"
            >
              Music Player
            </a>
          </div>
        </div>
        <div className="logout">
          <button onClick={this.logout}>logout</button>
        </div>
      </div>
    );
  }
}

export default Home;
