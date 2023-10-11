import "./UserPage.css";

// icons
import Whatsapp from "../../assets/whatsapp.png";
import Instagram from "../../assets/instagram.png";
import Facebook from "../../assets/facebook.png";
import Linkedin from "../../assets/linkedin.png";
import Telegram from "../../assets/telegram.png";
import TikTok from "../../assets/tik-tok.png";
import Twitter from "../../assets/twitter.png";
import Youtube from "../../assets/youtube.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Messages/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../Slices/userSlice";
import { getUserButtons } from "../../Slices/ButtonSlice";

const UserPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    buttons,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
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

  return (
    <div className="user-page">
      <div className="photo-profile">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
      </div>
      <h2>{user.name}</h2>
      <div className="buttons">
        {buttons.map((button) => (
          <div
            key={button._id}
            className={`button ${
              button.format === "circle" ? "circle-button" : "square-button"
            }`}
          >
            {button.format === "circle" ? (
              <div className="circle-icon">
                <div
                  className="circle-icon-background"
                  style={{ backgroundColor: button.backgroundColor }}
                >
                  <img src={images[button.icon]} alt={`Ícone ${button.icon}`} />
                </div>
                <div className="label">{button.title}</div>
              </div>
            ) : (
              <div
                className="square-button-long"
                style={{
                  backgroundColor: button.backgroundColor,
                  color: button.colorTitle,
                }}
              >
                <img src={images[button.icon]} alt={`Ícone ${button.icon}`} />
                <p>{button.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
