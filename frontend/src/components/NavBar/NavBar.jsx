import React from "react";

// Router
import { Link, NavLink } from "react-router-dom";

// CSS
import "./Navbar.css";
import MadeLinkLogo from "../../assets/MadeLink.jpeg";

// Hooks
import {
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillGearFill,
} from "react-icons/bs";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../../slices/authSlice";

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
      {/* <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form> */}
      <ul id="nav-links">
        {auth ? (
          <>
            {user && (
              <li>
                <NavLink to={`/user-page/${user._id}`}>
                  <BsHouseDoorFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to={`/edit-page`}>
                <BsFillGearFill />
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
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
