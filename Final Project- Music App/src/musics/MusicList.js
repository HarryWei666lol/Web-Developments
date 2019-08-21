import React from "react";
import { Link } from "react-router-dom";
import Music from "./Music";
import firebase from "../config/Firebase";
import "firebase/database";

const MusicList = ({ match, userid }) => { // list out all the music added
  const musicFilter = match.params.filter;
  const previousMusics = [];
  firebase
    .database()
    .ref()
    .child("musics")
    .on("child_added", snap => {
      if (snap.val().userid === userid) {
        previousMusics.push({
          musicid: snap.key,
          musicName: snap.val().musicName,
          musicDate: snap.val().musicDate,
          musicType: snap.val().musicType,
          musicSinger: snap.val().musicSinger,
          musicAlbum: snap.val().musicAlbum,
          userFavorite: snap.val().userFavorite,
          userid: userid,
          musicComment: snap.val().musicComment
        });
      }
    });
  const musics = musicFilter
    ? previousMusics.filter(music => music.musicType === musicFilter)
    : previousMusics;

  return ( // display relevant info
    <div className="musicList">
      <h2>Music Type -- {musicFilter ? musicFilter : "All"}</h2>
      <table className="musicTable">
        <thead>
          <tr>
            <th>Music Name</th>
            <th>Music Singer</th>
            <th>Music Album</th>
            <th>Music Release Date</th>
            <th>Music Type</th>
            <th>Music Comment</th>
          </tr>
        </thead>
        <tbody>
          {musics.map((music, i) => (
            <Music key={i} {...music} />
          ))}
        </tbody>
      </table>
      <div className="musicFilters">
        Filter by:
        <Link to="/list">All</Link>
        &#9679;
        <Link to="/list/Hiphop">Hiphop</Link>
        &#9679;
        <Link to="/list/Jazz">Jazz</Link>
        &#9679;
        <Link to="/list/Pop">Pop Music</Link>
        &#9679;
        <Link to="/list/Rock">Rock</Link>
        &#9679;
        <Link to="/list/Classical">Classical Music</Link>
      </div>
    </div>
  );
};

export default MusicList;
