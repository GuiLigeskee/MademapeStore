import React from "react";

// Router
import { Link, NavLink } from "react-router-dom";

// CSS
import "./NavBar.css";
import MadeLinkLogo from "../../assets/MadeLink.jpeg";

// Hooks
import {
  BsHouseDoorFill,
  BsPersonFill ,
  BsGearFill  ,
} from "react-icons/bs";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../../Slices/AuthSlice";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  // const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();

  //   if (query) {
  //     return navigate(`/search?q=${query}`);
  //   }
  // };

  return (
    <nav id="nav">
      <img src={MadeLinkLogo} alt="MadeLink" />
      <ul id="nav-links">
        {auth ? (
          <>
            {user && (
              <>
                <li>
                  <NavLink to={`/user-page/${user._id}`}>
                    <BsHouseDoorFill />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/edit-page/${user._id}`}>
                    < BsGearFill  />
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/profile">
                <BsPersonFill  />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
