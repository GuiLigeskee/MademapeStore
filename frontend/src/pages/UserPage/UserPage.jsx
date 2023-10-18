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

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Messages/Message";
import { Link } from "react-router-dom";
import { BsPencilFill, BsXLg } from "react-icons/bs";

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

  // Estilos para o background
  const backgroundStyles = {
    backgroundImage: `url(${uploads}/backgroundImage/${user.backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center center",
  };

  // // Reset component message
  // function resetComponentMessage() {
  //   setTimeout(() => {
  //     dispatch(resetMessage());
  //   }, 2000);
  // }

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserButtons(id));
  }, [dispatch, id]);

  // Exclude a button
  const handleDelete = (id) => {
    dispatch(deleteButton(id));

    resetMessage();
  };

  return (
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
      <h2 className="user-name" style={{ color: user.colorName }}>
        {user.name}
      </h2>

      <div className="buttons">
        {errorButton && <Message msg={errorButton} type="error" />}
        {messageButton && <Message msg={messageButton} type="success" />}
        {buttons.map((button) => (
          <div
            key={button._id}
            className={`button ${
              button.format === "circle" ? "circle-button" : "square-button"
            }`}
          >
            {button.format === "circle" ? (
              <div className="circle-icon">
                {id === userAuth._id && (
                  <div className="actions">
                    <Link to={`/update-button/${button._id}`}>
                      <BsPencilFill />
                    </Link>
                    <BsXLg onClick={() => handleDelete(button._id)} />
                  </div>
                )}
                <a href={button.url}>
                  <div
                    className="circle-icon-background"
                    style={{ backgroundColor: button.backgroundColor }}
                  >
                    <img
                      src={images[button.icon]}
                      alt={`Ícone ${button.icon}`}
                    />
                  </div>
                </a>
                <div
                  className="label-circle"
                  style={{ color: button.colorTitle }}
                >
                  {button.title}
                </div>
              </div>
            ) : (
              <div>
                {id === userAuth._id && (
                  <div className="actions">
                    <Link to={`/update-button/${button._id}`}>
                      <BsPencilFill />
                    </Link>
                    <BsXLg onClick={() => handleDelete(button._id)} />
                  </div>
                )}
                <a href={button.url}>
                  <div
                    className="square-button-long"
                    style={{
                      backgroundColor: button.backgroundColor,
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
            )}
          </div>
        ))}
        {buttons.length >= 0 && (
          <div className="add-button">
            <a href="/create-button">
              <p>Adicionar botão</p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
