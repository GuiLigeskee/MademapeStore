// CSS
import "./EditPage.css";

// Hooks
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

// Compoments
import Message from "../../components/Messages/Message";
import { Link, useNavigate, useParams } from "react-router-dom";

// Redux
import { getUserButtons } from "../../Slices/ButtonSlice";

// uploads
import { uploads } from "../../utils/config";

const EditPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const resetMessage = useResetComponentMessage(dispatch);

  const { id } = useParams();
  const { user, message, error, loading } = useSelector((state) => state.user);
  const { userAuth } = useSelector((state) => state.auth);
  const {
    buttons,
    button,
    loading: loadingButton,
    error: errorButton,
    message: messageButton,
  } = useSelector((state) => state.button);

  // Load user data
  useEffect(() => {
    dispatch(getUserButtons(user._id));
  }, [dispatch]);

  return (
    <div className="edit-page">
      <h2 className="titulo">Adiconar/editar botões</h2>

      <a href="/create-button">
        <div className="add-button">
          <p>Adicionar botão</p>
        </div>
      </a>
      <br />
      <p>Arraste e solte segurando nas setas para trocar a ordem dos botões.</p>
      <br />
      <div className="buttons">
        {buttons.map((button) => (
          <div key={button._id} className={`button ${button.format}`}>
            {id === userAuth._id && (
              <div className="actions">
                <Link to={`/update-button/${button._id}`}>
                  <BsPencilFill />
                </Link>
                <BsXLg onClick={() => handleDelete(button._id)} id="delete" />
              </div>
            )}
            <a href={button.url} target="_blank">
              <div
                className="square-button-long"
                style={{
                  backgroundColor: button.backgroundColor,
                }}
              >
                <img src={images[button.icon]} alt={`Ícone ${button.title}`} />
                <p className="label" style={{ color: button.colorTitle }}>
                  {button.title.toUpperCase()}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPage;
