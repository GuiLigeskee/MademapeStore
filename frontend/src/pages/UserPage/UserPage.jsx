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
import Twitch from "../../assets/twitch.png";
import Github from "../../assets/github.png";
import Globo from "../../assets/globo.png";
import Spotify from "../../assets/spotify.png";
import Discord from "../../assets/discord.png";
import Money from "../../assets/circulo-usd.png";
import Email from "../../assets/o-email.png";
import Maps from "../../assets/maps.png";
import Cellphone from "../../assets/cellphone.png";

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
    Globo,
    Whatsapp,
    Instagram,
    Facebook,
    Linkedin,
    Telegram,
    TikTok,
    Twitter,
    Youtube,
    Money,
    Twitch,
    Discord,
    Spotify,
    Github,
  ];

  useEffect(() => {
    if (user.darkTheme === true) {
      document.body.classList.add("modo-escuro");
    } else {
      document.body.classList.remove("modo-escuro");
    }
  }, [user.darkTheme]);

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserButtons(id));
  }, [dispatch, id]);

  return (
    <div
      className={`user-page ${user.darkTheme ? "modo-escuro" : "modo-claro"}`}
    >
      <div>
        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
            className="photo-profile"
            style={{ border: "5px solid " + user.colorTheme }}
          />
        )}
      </div>
      <>
        <h2 className="user-name" style={{ color: user.nameColor }}>
          {user.name}
        </h2>
        <h4 className="bio">{user.bio}</h4>
      </>

      <div className="fixed-buttons">
        {user.tell && (
          <div id="fixed-button">
            <a href={`tel:${user.tell}`} target="_blank">
              {user.darkTheme === true ? (
                <img src={Cellphone} style={{ filter: "invert(1)" }} />
              ) : (
                <img src={Cellphone} />
              )}
              <p>Telefone</p>
            </a>
          </div>
        )}
        {user.whatsapp && (
          <div id="fixed-button">
            <a href={`https://wa.me/${user.whatsapp}`} target="_blank">
              {user.darkTheme === true ? (
                <img src={Whatsapp} style={{ filter: "invert(1)" }} />
              ) : (
                <img src={Whatsapp} />
              )}
              <p>Whatsapp</p>
            </a>
          </div>
        )}
        {user.email && (
          <div id="fixed-button">
            <a href={`mailto:${user.email}`} target="_blank">
              {user.darkTheme === true ? (
                <img src={Email} style={{ filter: "invert(1)" }} />
              ) : (
                <img src={Email} />
              )}
              <p>Email</p>
            </a>
          </div>
        )}
        {user.address && (
          <div id="fixed-button">
            <a
              href={`https://www.google.com/maps?q=${user.address}`}
              target="_blank"
            >
              {user.darkTheme === true ? (
                <img src={Maps} style={{ filter: "invert(1)" }} />
              ) : (
                <img src={Maps} />
              )}
              <p>Localização</p>
            </a>
          </div>
        )}
      </div>

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
