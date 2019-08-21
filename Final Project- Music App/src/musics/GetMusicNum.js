import React from "react";
import GetMusicNumDisplay from "./GetMusicNumDisplay";
import firebase from "../config/Firebase";
import "firebase/database";

class GetMusicNum extends React.Component {
  constructor(props) { // constructor for get getMusicNum
    super(props);
    this.userid = props.userid;
    this.state = {
      allMusics: []
    };
    this.countMusic = this.countMusic.bind(this);
  }

  componentDidMount() { // get music number 
    const previousMusics = this.state.allMusics;
    firebase
      .database()
      .ref()
      .child("musics")
      .on("child_added", snap => {
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
          this.suggestMusic = this.state.allMusics[
            Math.floor(Math.random() * this.state.allMusics.length)
          ];
          this.suggestName = this.suggestMusic.musicName;
        }
      });
  }

  countMusic(musicFilter) { // filter function
    const { allMusics } = this.state;
    return allMusics.filter(music =>
      musicFilter ? music.musicType === musicFilter : music
    ).length;
  }

  render() {
    return ( // display relevant info
      <div className="musicsNum">
        <GetMusicNumDisplay
          total={this.countMusic()}
          hiphop={this.countMusic("Hiphop")}
          jazz={this.countMusic("Jazz")}
          pop={this.countMusic("Pop")}
          rock={this.countMusic("Rock")}
          classical={this.countMusic("Classical")}
          suggestName={this.suggestName}
        />
      </div>
    );
  }
}
export default GetMusicNum;
