import styles from "./UserPage.module.css";
import { uploads } from "../../utils/config";
import { Helmet } from 'react-helmet';

// icons
import { BsDownload, BsShare } from "react-icons/bs";
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
import Pix from "../../assets/pix.png";
import Pinterest from "../../assets/pinterest.png"


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

// Vcard
import vCard from 'vcards-js';

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
    Pinterest
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

  const handlePixButtonClick = () => {
    if (user.pix) {
      // Criar um elemento de área de transferência temporário
      const textarea = document.createElement("textarea");
      textarea.value = user.pix;

      // Adicionar o elemento ao corpo do documento
      document.body.appendChild(textarea);

      // Selecionar e copiar o conteúdo
      textarea.select();
      document.execCommand("copy");

      // Remover o elemento temporário
      document.body.removeChild(textarea);

      // Mensagem para o usuário indicando que o conteúdo foi copiado
      alert("Chave pix copiada");
    }
  };

  const generateVCard = () => {
    // Create a new vCard
    const vCardObj = vCard();

    // Set user information
    vCardObj.firstName = user.name;
    vCardObj.note = user.bio;

    // Set phone numbers
    if (user.tell) {
      vCardObj.homePhone = user.tell;
    }
    if (user.whatsapp) {
      vCardObj.cellPhone = user.whatsapp;
    }

    // Set email
    if (user.email) {
      vCardObj.email = user.email;
    }

    // Set address
    if (user.address) {
      vCardObj.homeAddress.street = user.address;
    }

    // Set user image with dynamically determined type
    if (user.profileImage) {
      const imageType = user.profileImage.split('.').pop().toUpperCase();
      vCardObj.photo.embedFromFile = {
        uri: user.profileImage,
        type: imageType,
      };
    }

    // Download vCard
    const vCardContent = vCardObj.getFormattedString();
    const blob = new Blob([vCardContent], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'user.vcf';
    link.click();
  };


  return (
    <div
      className={`${styles["user-page"]} ${user.darkTheme ? styles["modo-escuro"] : styles["modo-claro"]
        }`}
    >
      <div className={styles['header']}>
        <div className={styles["button-vcard"]} onClick={generateVCard}>
          <BsDownload />
          <p>Adicionar na agenda</p>
        </div>
        <div className={styles["button-share"]}>
          <BsShare />
          <p>Compartilhar</p>
        </div>
      </div>
      {/* <Helmet>
        <meta property="og:title" content="User Page Title" />
        <meta property="og:description" content="User bio or other relevant description" />
        <meta property="og:image" content="URL to the user's profile image" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div>
        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
            className={styles["photo-profile"]}
            style={{ border: "5px solid " + user.colorTheme }}
          />
        )}
      </div>
      <>
        <h2 className={styles["user-name"]}>{user.name}</h2>
        <h4 className={styles["bio"]}>{user.bio}</h4>
      </>

      {user.contactButtons === true && (
        <div className={styles["fixed-buttons"]}>
          {user.tell && (
            <div id={styles["fixed-button"]}>
              <a href={`tel:${user.tell}`} target="_blank">
                {user.darkTheme === true ? (
                  <img src={Cellphone} style={{ filter: "invert(1)" }} />
                ) : (
                  <img src={Cellphone} />
                )}
                {user.darkTheme === true ? (
                  <p style={{ color: "#ffffff" }}>Tell</p>
                ) : (
                  <p style={{ color: "#000000" }}>Tell</p>
                )}
              </a>
            </div>
          )}
          {user.whatsapp && (
            <div id={styles["fixed-button"]}>
              <a href={`https://wa.me/${user.whatsapp}`} target="_blank">
                {user.darkTheme === true ? (
                  <img src={Whatsapp} style={{ filter: "invert(1)" }} />
                ) : (
                  <img src={Whatsapp} />
                )}
                {user.darkTheme === true ? (
                  <p style={{ color: "#ffffff" }}>Whats</p>
                ) : (
                  <p style={{ color: "#000000" }}>Whats</p>
                )}
              </a>
            </div>
          )}
          {user.email && (
            <div id={styles["fixed-button"]}>
              <a href={`mailto:${user.email}`} target="_blank">
                {user.darkTheme === true ? (
                  <img src={Email} style={{ filter: "invert(1)" }} />
                ) : (
                  <img src={Email} />
                )}
                {user.darkTheme === true ? (
                  <p style={{ color: "#ffffff" }}>Email</p>
                ) : (
                  <p style={{ color: "#000000" }}>Email</p>
                )}
              </a>
            </div>
          )}
          {user.address && (
            <div id={styles["fixed-button"]}>
              <a
                href={`https://www.google.com/maps?q=${user.address}`}
                target="_blank"
              >
                {user.darkTheme === true ? (
                  <img src={Maps} style={{ filter: "invert(1)" }} />
                ) : (
                  <img src={Maps} />
                )}
                {user.darkTheme === true ? (
                  <p style={{ color: "#ffffff" }}>Maps</p>
                ) : (
                  <p style={{ color: "#000000" }}>Maps</p>
                )}
              </a>
            </div>
          )}
          {user.pix && (
            <div id={styles["fixed-button"]} onClick={handlePixButtonClick}>
              {user.darkTheme === true ? (
                <img src={Money} style={{ filter: "invert(1)" }} />
              ) : (
                <img src={Money} />
              )}
              {user.darkTheme === true ? (
                <p style={{ color: "#ffffff" }}>Pix</p>
              ) : (
                <p style={{ color: "#000000" }}>Pix</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles["buttons"]}>
        {buttons &&
          buttons.map((button) => (
            <div key={button._id} className={styles["button"]}>
              <a href={button.url} target="_blank">
                <div
                  className={styles["square-button-long"]}
                  style={{
                    backgroundColor: user.colorTheme,
                  }}
                >
                  <img
                    src={images[button.icon]}
                    alt={`Ícone ${button.title}`}
                  />
                  <p
                    className={styles["label"]}
                    style={{ color: button.colorTitle }}
                  >
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
