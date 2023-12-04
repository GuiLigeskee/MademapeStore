// CSS
import styles from "./CreateButton.module.css";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

// Redux
import { createButton, resetMessage } from "../../Slices/ButtonSlice";

// Compoments
import Message from "../../components/Messages/Message";
import { Link, useNavigate } from "react-router-dom";

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
import Pinterest from "../../assets/pinterest.png"

const CreateButton = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const navigate = useNavigate();
  const { message, loading, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  // States
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconIndex, setIconIndex] = useState(null);

  // Imagens dos ícones
  const icons = [
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

  const handleIconSelect = (index) => {
    setIconIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const button = {
      title,
      icon: iconIndex,
      url,
    };

    console.log(button);

    dispatch(createButton(button));
    resetMessage();
    navigate(`/user-page/${user._id}`);
  };

  return (
    <div className={styles["create-button"]}>
      <h2 id={styles["titulo"]}>Criar Botão</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>
            Passo 1: <p>digite o nome do botão.</p>
          </span>
          <input
            type="text"
            placeholder="Nome do botão"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
          />
        </label>
        <label>
          <span>
            Passo 2: <p>cole a URL desejada.</p>
          </span>
          <input
            type="url"
            placeholder="URL"
            onChange={(e) => setUrl(e.target.value)}
            value={url || ""}
            required
          />
        </label>
        <label>
          <span>
            Passo 3: <p>escolha um ícone para o seu botão.</p>
          </span>
          <div className={styles["icon-list"]}>
            {icons.map((icon, index) => (
              <div
                key={index}
                className={`${styles["icon-item"]} ${
                  index === iconIndex ? styles["selected"] : ""
                }`}
                onClick={() => handleIconSelect(index)}
              >
                <img src={icon} alt={`Ícone ${icon}`} />
              </div>
            ))}
          </div>
        </label>
        {!loading && <input type="submit" value="Criar botão" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default CreateButton;
