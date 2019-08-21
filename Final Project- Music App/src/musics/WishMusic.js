import React from "react";
import WishDisplay from "./WishDisplay";
import firebase from "../config/Firebase";
import "firebase/database";

class WishMusic extends React.Component { // constructor for wishMusic
  constructor(props) {
    super(props);
    this.userid = props.userid;
    this.state = {
      wishMusic: []
    };
  }

  componentDidMount() { // track changes in variables
    const previousMusics = this.state.wishMusic;
    firebase
      .database()
      .ref()
      .child("musics")
      .on("child_added", snap => {
        if (
          snap.val().userid === this.userid &&
          snap.val().userFavorite === true
        ) {
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
            wishMusic: previousMusics
          });
        }
      });
  }

  render() {
    return ( // display what needs to be returned to the page
      <div className="wish">
        <h2>My Wish List</h2>
        <div className="wishDisplay" />
        {this.state.wishMusic.length !== 0 ? (
          <WishDisplay wishMusics={this.state.wishMusic} />
        ) : (
          <h2>No Result Found</h2>
        )}
      </div>
    );
  }
}

export default WishMusic;
