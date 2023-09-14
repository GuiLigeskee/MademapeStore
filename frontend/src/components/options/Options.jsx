import React from "react";
import "./Options.css";

import { Link, NavLink } from "react-router-dom";

// Hooks
import { BsFillPersonFill, BsPencilFill } from "react-icons/bs";

const Options = () => {
  return (
    <nav id="options">
      <NavLink id="nav-links">
        <BsFillPersonFill />
      </NavLink>
      <NavLink id="nav-links">
        <BsPencilFill />
      </NavLink>
    </nav>
  );
};

export default Options;
