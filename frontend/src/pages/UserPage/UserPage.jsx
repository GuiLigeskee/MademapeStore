import "./UserPage.css";

// icons
import Whatsapp from "/src/assets/whatsapp.png";
import Instagram from "/src/assets/instagram.png";
import Facebook from "/src/assets/facebook.png";
import Linkedin from "/src/assets/linkedin.png";
import Telegram from "/src/assets/telegram.png";
import TikTok from "/src/assets/tik-tok.png";
import Twitter from "/src/assets/twitter.png";
import Youtube from "/src/assets/youtube.png";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Messages/Message";
import { Link } from "react-router-dom";
import { BsPencilFill, BsXLg, BsFillPlusCircleFill } from "react-icons/bs";
import ReactLoading from "react-loading";

// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../Slices/userSlice";
import {
  deleteButton,
  getUserButtons,
  resetMessage,
} from "../../Slices/ButtonSlice";

const UserPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    buttons,
    button,
    loading: loadingButton,
    error: errorButton,
    message: messageButton,
  } = useSelector((state) => state.button);

  const images = [
    Whatsapp,
    Instagram,
    Facebook,
    Linkedin,
    Telegram,
    TikTok,
    Twitter,
    Youtube,
  ];

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserButtons(id));
  }, [dispatch, id]);

  if (loading || loadingButton) {
    <ReactLoading
      type={"bubbles"}
      color={"#fffff"}
      height={"20%"}
      width={"20%"}
    ></ReactLoading>;
  }

  return (
    <div className="user-page">
      <div>
        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
            className="photo-profile"
          />
        )}
      </div>
      <h2 className="user-name" style={{ color: user.nameColor }}>
        {user.name}
      </h2>

      <div className="buttons">
        {buttons &&
          buttons.map((button) => (
            <div key={button._id} className={`button`}>
              <a href={button.url} target="_blank">
                <div
                  className="square-button-long"
                  style={{
                    backgroundColor: user.colorTheme,
                  }}
                >
                  <img
                    src={images[button.icon]}
                    alt={`Ícone ${button.title}`}
                  />
                  <p className="label" style={{ color: button.colorTitle }}>
                    {button.title.toUpperCase()}
                  </p>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserPage;
