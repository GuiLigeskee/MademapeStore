// CSS
import styles from "./CreateButton.module.css";

// Redux
import { updateButton, buttonDetails } from "../../Slices/ButtonSlice";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";
import { Link, useNavigate, useParams } from "react-router-dom";

// Compoments
import Message from "../../components/Messages/Message";

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

const UpdateButton = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const navigate = useNavigate();
  const { button, message, error, loading } = useSelector(
    (state) => state.button
  );

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  // States
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState(0);
  const [buttonShape, setButtonShape] = useState("");
  const [format, setFormat] = useState("");
  const [colorTitle, setColorTitle] = useState("#000000" || "#rrggbb");
  const [backgroundColor, setBackgroundColor] = useState(
    "#ffffff" || "#rrggbb"
  );

  // Imagens dos ícones
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

  // Carrossel de icones
  const goToPrevious = (e) => {
    e.preventDefault();
    setIcon((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e) => {
    e.preventDefault();
    setIcon((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // formatos de botões
  const toggleButtonShape = (shape, e) => {
    e.preventDefault();
    setButtonShape(shape);
    setFormat(shape); // Defina o botão selecionado ao clicar
  };

  // load button TESTE
  useEffect(() => {
    dispatch(buttonDetails(id));
  }, [dispatch]);

  // fill button form TESTE
  useEffect(() => {
    if (button) {
      setTitle(button.title);
      setUrl(button.url);
      setColorTitle(button.colorTitle);
      setFormat(button.format);
      setIcon(button.icon);
      setBackgroundColor(button.backgroundColor);
    }
  }, [button]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather user data from states
    const button = {
      title: title,
      colorTitle: colorTitle,
      backgroundColor: backgroundColor,
      format: format,
      icon: icon,
      url: url,
      id,
    };

    console.log(button);

    dispatch(updateButton(button));

    resetMessage();

    navigate(`/user-page/${user._id}`);
  };

  // Load user data
  useEffect(() => {
    dispatch(updateButton());
  }, [dispatch]);

  return (
    <div>
      <div className={styles["create-button"]}>
        <h2 id={styles["titulo"]}>Atualizar Botão</h2>
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
            <div className={styles["carousel"]}>
              <button
                className={styles["carousel-button"]}
                onClick={goToPrevious}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <img src={images[icon]} alt={`Imagem ${icon + 1}`} />
              <button className={styles["carousel-button"]} onClick={goToNext}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </label>
          <label>
            <span>
              Passo 4: <p>escolha o formato do botão.</p>
            </span>
            <div className={styles["button-shape-carousel"]}>
              <button
                type="button"
                onClick={(e) => toggleButtonShape("circle", e)}
                className={`${styles["button-shape-option"]} ${
                  format === "circle" ? styles["selected"] : ""
                }`}
              >
                <div id={styles["shape-circle"]}></div>
              </button>
              <button
                type="button"
                onClick={(e) => toggleButtonShape("square", e)}
                className={`${styles["button-shape-option"]} ${
                  format === "square" ? styles["selected"] : ""
                }`}
              >
                <div id={styles["shape-long-circle"]}></div>
              </button>
            </div>
          </label>
          <label htmlFor="button-color" id="button-color">
            <span>
              Passo 5: <p>Escolher cor do botão.</p>
            </span>
            <input
              type="color"
              name="button-color"
              id="button-color"
              onChange={(e) => setBackgroundColor(e.target.value)}
              value={backgroundColor || ""}
            />
          </label>
          <label htmlFor="title-color" id="title-color">
            <span>
              Passo 5: <p>Escolher cor do nome.</p>
            </span>
            <input
              type="color"
              name="title-color"
              id="title-color"
              onChange={(e) => setColorTitle(e.target.value)}
              value={colorTitle || ""}
            />
          </label>
          {!loading && <input type="submit" value="Atualizar botão" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
        </form>
      </div>
    </div>
  );
};

export default UpdateButton;
