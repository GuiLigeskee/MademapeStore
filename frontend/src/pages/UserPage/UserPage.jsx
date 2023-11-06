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

  // Atualizar botões do usuário sempre que um botão for atualizado em UpdateButton
  useEffect(() => {
    if (messageButton === "Button updated successfully") {
      // Se uma atualização bem-sucedida ocorreu em UpdateButton, atualize os botões do usuário
      dispatch(getUserButtons(id));
      dispatch(resetMessage());
    }
  }, [messageButton, dispatch, id]);

  // Exclude a button
  const handleDelete = (id) => {
    dispatch(deleteButton(id));

    resetMessage();
  };

  if (loading || loadingButton) {
    <ReactLoading
      type={"bubbles"}
      color={"#fffff"}
      height={"20%"}
      width={"20%"}
    ></ReactLoading>;
  }

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
      <h2 className="user-name" style={{ color: user.nameColor }}>
        {user.name}
      </h2>

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
                {id === userAuth._id && (
                  <div className="actions">
                    <Link to={`/update-button/${button._id}`}>
                      <BsPencilFill />
                    </Link>
                    <BsXLg
                      onClick={() => handleDelete(button._id)}
                      id="delete"
                    />
                  </div>
                )}
                <a href={button.url} target="_blank">
                  <div
                    className="circle-icon-background"
                    style={{ backgroundColor: user.colorTheme }}
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
                  {button.title.toUpperCase()}
                </div>
              </div>
            ) : (
              <div>
                {id === userAuth._id && (
                  <div className="actions">
                    <Link to={`/update-button/${button._id}`}>
                      <BsPencilFill />
                    </Link>
                    <BsXLg
                      onClick={() => handleDelete(button._id)}
                      id="delete"
                    />
                  </div>
                )}
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
