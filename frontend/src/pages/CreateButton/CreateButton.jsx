// CSS
import styles from "./CreateButton.module.css";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CreateButton = () => {
  const dispatch = useDispatch();
  // const resetMessage = useResetComponentMessage(dispatch);
  const { loading, error } = useSelector((state) => state.auth);

  // States
  const [title, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setCurrentIndex] = useState(0);
  const [buttonShape, setButtonShape] = useState("");
  const [format, setSelectedButton] = useState("");
  const [backgroundColor, setButtonColor] = useState("#ffffff" || "#rrggbb");
  const [colorTitle, setTitleColor] = useState("#000000" || "#rrggbb");

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
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // formatos de botões
  const toggleButtonShape = (shape, e) => {
    e.preventDefault();
    setButtonShape(shape);
    setSelectedButton(shape); // Defina o botão selecionado ao clicar
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const button = {
      title,
      colorTitle,
      backgroundColor,
      format,
      icon,
      url,
    };

    console.log(button);

    dispatch(createButton());
    // resetMessage();
  };

  // clean all auth states
  useEffect(() => {
    dispatch(resetMessage());
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
            onChange={(e) => setName(e.target.value)}
            value={title}
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
            value={url}
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
            onChange={(e) => setButtonColor(e.target.value)}
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
            onChange={(e) => setTitleColor(e.target.value)}
            value={colorTitle || ""}
          />
        </label>
        {!loading && <input type="submit" value="Criar botão" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
    </div>
  );
};

export default CreateButton;
