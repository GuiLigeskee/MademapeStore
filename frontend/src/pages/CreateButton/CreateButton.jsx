// CSS
import "./CreateButton.css";

// Hooks
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

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
  const images = [
    Whatsapp,
    Instagram,
    Facebook,
    Linkedin,
    Telegram,
    TikTok,
    Twitter,
    Youtube,
  ]; // Substitua com os caminhos reais das suas imagens.

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="create-button">
      <h2 id="titulo">Criar Botão</h2>
      <div className="carousel">
        <button className="carousel-button" onClick={goToPrevious}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <img src={images[currentIndex]} alt={`Imagem ${currentIndex + 1}`} />
        <button className="carousel-button" onClick={goToNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default CreateButton;
