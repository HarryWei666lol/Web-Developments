import React from "react";

const AddMusic = ({ newMusic }) => { // user adds a music 
  let musicName, musicDate, musicType, musicSinger, musicAlbum, musicComment;

  const submit = event => {
    event.preventDefault();

    newMusic({
      musicName: musicName.value,
      musicDate: musicDate.value,
      musicType: musicType.value,
      musicSinger: musicSinger.value,
      musicAlbum: musicAlbum.value,
      userFavorite: false,
      userid: "",
      musicComment: musicComment.value
    });
    musicName.value = "";
    musicDate.value = "";
    musicType.value = "";
    musicSinger.value = "";
    musicAlbum.value = "";
    musicComment.value = "";
  };
  return ( // set up the addMusic page
    <div className="addMusic">
      <form onSubmit={submit}>
        <label>
          <h2>Add a music</h2>
          <br />
        </label>
        <label>
          Music Name: <br />
          <input
            id="mName"
            type="text"
            required
            ref={input => (musicName = input)}
          />
          <br />
        </label>
        <label>
          Music Singer: <br />
          <input
            id="mSinger"
            type="text"
            required
            ref={input => (musicSinger = input)}
          />
          <br />
        </label>
        <label>
          Music Album Name: <br />
          <input
            id="mAlbuum"
            type="text"
            required
            ref={input => (musicAlbum = input)}
          />
          <br />
        </label>
        <label>
          Music Release Date: <br />
          <input
            id="mDate"
            type="date"
            required
            ref={input => (musicDate = input)}
          />
          <br />
        </label>
        <label>
          Music Type: <br />
          <select ref={input => (musicType = input)}>
            <option value="" />
            <option value="Hiphop">HipHop</option>
            <option value="Jazz">Jazz</option>
            <option value="Pop">Pop Music</option>
            <option value="Rock">Rock</option>
            <option value="Classical">Classical Music</option>
          </select>
          <br />
        </label>
        <div className="commentArea">
          <textarea
            id="mComment"
            type="text"
            rows="4"
            cols="50"
            placeholder="Enter You Comment Here"
            ref={input => (musicComment = input)}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddMusic;
