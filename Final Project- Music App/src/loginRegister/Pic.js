import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import { FaLaugh } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export const Pic = () => (
  <nav className="nav">
    <Link to="/">
      <FaHome />
    </Link>
    <Link to="/add">
      <FaPlus />
    </Link>
    <Link to="/list">
      <FaTable />
    </Link>
    <Link to="/wishList">
      <FaLaugh />
    </Link>
    <Link to="/search">
      <FaSearch />
    </Link>
  </nav>
);
