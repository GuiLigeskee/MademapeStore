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

  const userBackgroundImage = user.backgroundImage;

  // Estilos para o background
  const backgroundStyles = {
    backgroundImage: `url(${uploads}/backgroundImage/${user.backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center center",
  };

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserButtons(id));
  }, [dispatch, id]);

  //localhost:5173/user-page/6520706c424cfc5235ca062b
  http: return (
    <div className="user-page" style={backgroundStyles}>
      <img src={user.backgroundImage} alt="" />
      <div>
        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
            className="photo-profile"
          />
        )}
      </div>
      <h2 className="user-name" style={user.colorName}>
        {user.name}
      </h2>
      <div className="buttons">
        {buttons.map((button) => (
          <a
            href={button.url}
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
                <p className="label">{button.title}</p>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
