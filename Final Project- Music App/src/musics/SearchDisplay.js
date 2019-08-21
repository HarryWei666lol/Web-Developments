import React from "react";
import Music from "./Music";

const SearchDisplay = ({ searchMusics }) => ( // user can search music 
  <div className="searchList">
    <h2>Search Result</h2>
    <table className="searchTable">
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
        {searchMusics.map((music, i) => (
          <Music key={i} {...music} />
        ))}
      </tbody>
    </table>
  </div>
);

export default SearchDisplay;
