import React, { useState } from "react";

const EditPage = () => {
  const [titleColor, setTitleColor] = useState("#000000"); // Cor inicial do título
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [buttons, setButtons] = useState([
    { text: "", url: "" }, // Botão inicial
  ]);

  const handleTitleColorChange = (e) => {
    setTitleColor(e.target.value);
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    setBackgroundImage(file);
  };

  const handleAddButton = () => {
    setButtons([...buttons, { text: "", url: "" }]);
  };

  const handleButtonTextChange = (text, index) => {
    const updatedButtons = [...buttons];
    updatedButtons[index].text = text;
    setButtons(updatedButtons);
  };

  const handleButtonUrlChange = (url, index) => {
    const updatedButtons = [...buttons];
    updatedButtons[index].url = url;
    setButtons(updatedButtons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode enviar os dados do formulário para onde quiser, por exemplo, uma função que atualiza a página.
    // Você pode usar titleColor, backgroundImage e buttons para enviar os dados do formulário.

    console.log("Dados do formulário:", {
      titleColor,
      backgroundImage,
      buttons,
    });
  };

  return (
    <div id="edit-page">
      <h2>Editar Página</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Cor do Título:</span>
          <input
            type="color"
            value={titleColor}
            onChange={handleTitleColorChange}
            className="custom-color-input"
          />
        </label>
        <br />
        <label>
          <span>Foto de Plano de Fundo:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundImageChange}
          />
        </label>
        <br />
        <h3>Botões</h3>
        {buttons.map((button, index) => (
          <div key={index}>
            <label>
              <span>Texto do Botão:</span>
              <input
                type="text"
                value={button.text}
                onChange={(e) => handleButtonTextChange(e.target.value, index)}
              />
            </label>
            <br />
            <label>
              <span>Link do Botão:</span>
              <input
                type="url"
                value={button.url}
                onChange={(e) => handleButtonUrlChange(e.target.value, index)}
              />
            </label>
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddButton}>
          Adicionar Botão
        </button>
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditPage;
