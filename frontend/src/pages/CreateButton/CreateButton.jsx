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
import Whatsapp from "/src/assets/whatsapp.png";
import Instagram from "/src/assets/instagram.png";
import Facebook from "/src/assets/facebook.png";
import Linkedin from "/src/assets/linkedin.png";
import Telegram from "/src/assets/telegram.png";
import TikTok from "/src/assets/tik-tok.png";
import Twitter from "/src/assets/twitter.png";
import Youtube from "/src/assets/youtube.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CreateButton = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const navigate = useNavigate();
  const { message, loading, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  // States
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Imagens dos ícones
  const icons = [
    Whatsapp,
    Instagram,
    Facebook,
    Linkedin,
    Telegram,
    TikTok,
    Twitter,
    Youtube,
  ];

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const button = {
      title,
      icon,
      url,
    };

    dispatch(createButton(button));
    resetMessage();
    navigate(`/user-page/${user._id}`);
  };

  useEffect(() => {
    dispatch(createButton());
  }, [dispatch]);

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
                  icon === selectedIcon ? styles["selected"] : ""
                }`}
                onClick={() => handleIconSelect(icon)}
              >
                <img src={icon} alt={`Ícone ${index}`} />
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
