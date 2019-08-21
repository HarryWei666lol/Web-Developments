import React from "react";
// display the Music Number
const GetMusicNumDisplay = ({
  total,
  hiphop,
  jazz,
  pop,
  rock,
  classical,
  suggestName
}) => (
  <div className="musicsNum">
    <div className="totalNum">
      <h1>{total} Musics</h1>
    </div>
    <div className="hiphopNum">
      <h3>{hiphop} Hip Hop</h3>
    </div>
    <div className="jazzNum">
      <h3>{jazz} Jazz</h3>
    </div>
    <div className="popNum">
      <h3>{pop} Pop Music</h3>
    </div>
    <div className="rockNum">
      <h3>{rock} Rock</h3>
    </div>
    <div className="classicalNum">
      <h3>{classical} Classical Music</h3>
    </div>
    <div className="suggestNum">
      <h3>Today we have ({suggestName}) for you</h3>
    </div>
  </div>
);

export default GetMusicNumDisplay;
