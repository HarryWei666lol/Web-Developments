import React from "react";
import firebase from "../config/Firebase";
import "firebase/database";

class Music extends React.Component {
  constructor(props) { // constructor for the main music
    super(props);
    this.musicName = props.musicName;
    this.musicDate = props.musicDate;
    this.musicType = props.musicType;
    this.musicSinger = props.musicSinger;
    this.musicAlbum = props.musicAlbum;
    this.musicid = props.musicid;
    this.userid = props.userid;
    this.musicComment = props.musicComment;

    this.changeToFavorite = this.changeToFavorite.bind(this);
    this.deleteMusic = this.deleteMusic.bind(this);
  }

  changeToFavorite() { // user can add the music to wishlist
    firebase
      .database()
      .ref("musics/" + this.musicid)
      .set({
        musicid: this.musicid,
        musicName: this.musicName,
        musicDate: this.musicDate,
        musicType: this.musicType,
        musicSinger: this.musicSinger,
        musicAlbum: this.musicAlbum,
        userFavorite: true,
        userid: this.userid,
        musicComment: this.musicComment
      });
  }

  deleteMusic() { // user can delete the selected music
    firebase
      .database()
      .ref("musics/" + this.musicid)
      .remove();
  }

  render() { // display the necessary info
    return (
      <tr>
        <td>{this.musicName}</td>
        <td>{this.musicSinger}</td>
        <td>{this.musicAlbum}</td>
        <td>{this.musicDate}</td>
        <td>{this.musicType}</td>
        <td>{this.musicComment}</td>
        <td>
          <button name="deleteid" type="submit" onClick={this.deleteMusic}>
            Delete
          </button>
        </td>
        <td>
          <button name="favorite" type="submit" onClick={this.changeToFavorite}>
            Add to wish list
          </button>
        </td>
      </tr>
    );
  }
}

export default Music;
