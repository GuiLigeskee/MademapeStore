// CSS
import "./EditPage.css";

// Hooks
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

// Compoments
import Message from "../../components/Messages/Message";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { profile, updateUserPage } from "../../Slices/userSlice";

// uploads
import { uploads } from "../../utils/config";

const EditPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user, message, error, loading } = useSelector((state) => state.user);

  // Inicialize o estado 'name' com o nome atual do usuário
  const [name, setName] = useState(user.name || "");
  const [nameColor, setNameColor] = useState("#ffffff" || "#rrggbb");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [previewBackground, setPreviewBackground] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill user form
  useEffect(() => {
    if (user) {
      setNameColor(user.nameColor);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {};
    if (name) {
      userData.name = name;
    }

    if (backgroundImage) {
      userData.backgroundImage = backgroundImage;
    }

    if (nameColor) {
      userData.nameColor = nameColor;
    }

    // Construa o FormData
    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

    // Despache a ação para atualizar o usuário
    dispatch(updateUserPage(formData));

    resetMessage();

    navigate(`/user-page/${user._id}`);
  };

  const handleFileChange = (e) => {
    // Lide com a seleção de arquivos e atualize o estado 'backgroundImage'
    const file = e.target.files[0];
    setBackgroundImage(file);
    setPreviewBackground(file);
  };

  return (
    <div className="edit-page">
      <h2 id="titulo">Editar Página</h2>
      {(user.backgroundImage || previewBackground) && (
        <img
          className="background-image"
          src={
            previewBackground
              ? URL.createObjectURL(previewBackground)
              : `${uploads}/backgroundImage/${user.backgroundImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="background-image" id="button-background">
          <span>Carregue um plano de fundo para seu card</span>
          <input
            type="file"
            name="backgroundImage"
            id="background-image"
            onChange={handleFileChange}
          />
        </label>
        <label htmlFor="text-color" id="text-color">
          <span>Escolher cor do nome do card:</span>
          <input
            type="color"
            name="text-color"
            id="text-color"
            onChange={(e) => setNameColor(e.target.value)}
            value={nameColor || ""}
          />
        </label>
        {!loading && <input type="submit" value="Salvar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
      {/* <h2 id="titulo">Crie seus botões</h2>
      <Link to="/create-button">
        <button>Clique aqui para criar um botão</button>
      </Link> */}
    </div>
  );
};

export default EditPage;
