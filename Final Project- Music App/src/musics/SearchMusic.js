import React from "react";
import SearchDisplay from "./SearchDisplay";

class SearchMusic extends React.Component { // constructor for searchMusic
  constructor(props) {
    super(props);

    this.allMusics = props.allMusics;
    this.state = {
      searchMusic: [],
      searchContent: ""
    };
    this.SearchMusic = this.SearchMusic.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  SearchMusic() { // user can search music
    var previousMusic = [];
    this.setState({ searchMusic: previousMusic });
    for (let i = 0; i < this.allMusics.length; i++) {
      if (
        this.allMusics[i].musicName.includes(this.state.searchContent) &&
        this.state.searchContent !== ""
      ) {
        var included = false;
        for (let j = 0; j < previousMusic.length; j++) {
          if (previousMusic[j].musicid === this.allMusics[i].musicid) {
            included = true;
          }
        }

        if (!included) {
          previousMusic.push(this.allMusics[i]);
        }
      }
    }
    this.setState({ searchMusic: previousMusic });
  }

  render() { // display relevant info
    return (
      <div className="search">
        <div className="searchPart">
          <input
            id="search"
            name="searchContent"
            value={this.state.searchContent}
            onChange={this.handleChange}
          />
          <button type="submit" value="Submit" onClick={this.SearchMusic}>
            Search
          </button>
          <div className="display" />
          {this.state.searchMusic.length !== 0 ? (
            <SearchDisplay searchMusics={this.state.searchMusic} />
          ) : (
            <h2>No Result Found</h2>
          )}
        </div>
      </div>
    );
  }
}

export default SearchMusic;
