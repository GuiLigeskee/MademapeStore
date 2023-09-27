import "./EditPage.css";

import { uploads } from "../../utils/config";

//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

// Redux
import { fetchUserPage, updateUserPage } from "../../Slices/userPageSlice";

// Components
import Message from "../../components/Messages/Message";

const EditPage = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  // handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="edit-page">
      <h2 id="titulo">Editar Página</h2>
      <form /*onSubmit={handleSubmit}*/>
        <label htmlFor="text-color" id="text-color">
          <span>Escolher cor do nome da página</span>
          <input type="color" name="text-color" id="text-color" />
        </label>
        <br />
        <label htmlFor="background-image" id="button-background">
          <span>Carregue um plano de fundo para seu card</span>
          <input type="file" name="background-image" id="background-image" />
        </label>
        <input type="submit" value="Salvar" />
      </form>
      <h2 id="titulo">Crie seus botões</h2>
      <button>Clique aqui para criar um botão</button>
    </div>
  );
};

export default EditPage;
