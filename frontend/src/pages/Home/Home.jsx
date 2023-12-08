import React from "react";
import "./Home.css";

// Photos
import CardModel from "../../assets/modelo-card.png";

const Home = () => {
  return (
    <div>
      <div className="home">
      <header className="home-header">
        <h1>MadeLink</h1>
        <p>Seu cartão de visita 100% digital</p>
      </header>
      <main className="home-main">
        <p>
          Com o MadeLink, você pode criar seu próprio cartão digital de forma fácil e rápida.
          Personalize com suas informações, como links para redes sociais, site, PIX, endereço e telefone.
        </p>
        <br />
        <p>
          Destaque-se online e compartilhe suas informações de contato de maneira moderna e eficiente.
        </p>
        <div>
          <img src={CardModel} className="photo"/>
        </div>
        <br />
        <p>Gostou? <br /> Então clique no botão abaixo e crie seu cartão de visitas.</p>
        <a href="/register" className="cta-button">Criar meu cartão</a>
      </main>
    </div>
    </div>
  );
};

export default Home;
