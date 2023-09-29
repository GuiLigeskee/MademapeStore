import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";
import { updateUserPage } from "../../Slices/userSlice";
import Message from "../../components/Messages/Message";

const EditPage = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user, message, error, loading } = useSelector((state) => state.user);

  // Inicialize o estado 'name' com o nome atual do usuário
  const [name, setName] = useState(user.name || "");
  const [nameColor, setNameColor] = useState("#ffffff" || "#rrggbb");
  const [backgroundImage, setBackgroundImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(updateUserPage());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Certifique-se de que 'name' não seja 'undefined' antes de incluí-lo nos dados do usuário
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
    await dispatch(updateUserPage(formData));

    resetMessage();
  };

  const handleFileChange = (e) => {
    // Lide com a seleção de arquivos e atualize o estado 'backgroundImage'
    const file = e.target.files[0];
    setBackgroundImage(file);
  };

  return (
    <div className="edit-page">
      <h2 id="titulo">Editar Página</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text-color" id="text-color">
          <span>Escolher cor do nome da página</span>
          <input
            type="color"
            name="text-color"
            id="text-color"
            onChange={(e) => setNameColor(e.target.value)}
            value={nameColor || ""}
          />
        </label>
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
        {!loading && <input type="submit" value="Salvar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <h2 id="titulo">Crie seus botões</h2>
      <button>Clique aqui para criar um botão</button>
    </div>
  );
};

export default EditPage;
