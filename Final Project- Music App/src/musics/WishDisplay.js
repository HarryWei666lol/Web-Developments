import React from "react";
import Music from "./Music";

const WishDisplay = ({ wishMusics }) => ( // user can add to wishlist 
  <div className="wishList">
    <table className="wishTable">
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
        {wishMusics.map((music, i) => (
          <Music key={i} {...music} />
        ))}
      </tbody>
    </table>
  </div>
);

export default WishDisplay;
