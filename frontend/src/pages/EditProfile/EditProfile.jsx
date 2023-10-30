import "./EditProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";
import { useNavigate } from "react-router-dom";

// Redux
import { profile, updateProfile } from "../../Slices/userSlice";

// Components
import Message from "../../components/Messages/Message";

const Profile = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const navigate = useNavigate();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [userPage, setUserPage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill user form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async () => {
    // Gather user data from states
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    dispatch(updateProfile(formData));

    resetMessage();
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // change image state
    setProfileImage(image);
  };

  return (
    <div className="edit-profile">
      <h2 className="titulo">PERFIL</h2>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="arquivo" className="foto-perfil">
          <span>Carregar imagem de perfil</span>
          <input
            type="file"
            onChange={handleFile}
            name="arquivo"
            id="arquivo"
          />
        </label>
        <p id="obs">
          Para melhor resultado na imagem, carregar uma imagem quadrada com
          500x500 pixels.
        </p>
        <label htmlFor="text-color" id="text-color">
          <span>Cor padrão do card:</span>
          <input type="color" name="text-color" id="text-color" />
        </label>
        <label>
          <div class="switch-container">
            <span>Tema do card</span>
            <div class="toggle-switch">
              <label id="switch-label">
                <input type="checkbox" id="switch-input" />
                <span class="slider" id="switch-span"></span>
              </label>
            </div>
          </div>
        </label>
        <hr />
        <label>
          <span>Nome de usuário</span>
          <div className="input-row">
            <p>mademapestore/user-page/</p>
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => setUserPage(e.target.value)}
              value={userPage || ""}
            />
          </div>
        </label>
        <label>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
        </label>
        <label>
          <span>Cargo ou área de atuação</span>
          <input type="text" placeholder="cargo ou area de atuação" />
        </label>
        <label>
          <span>Bio</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <div class="switch-container">
            <span>Ícones minimalistas</span>
            <div class="toggle-switch">
              <label id="switch-label">
                <input type="checkbox" id="switch-input" />
                <span class="slider-2" id="switch-span"></span>
              </label>
            </div>
          </div>
        </label>

        <div className="form2">
          <label htmlFor="contactNumber">Contato</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="Número de contato"
            required
          />

          <label htmlFor="phoneNumber">Telefone</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Número de telefone"
            required
          />

          <label htmlFor="whatsappNumber">WhatsApp</label>
          <input
            type="text"
            id="whatsappNumber"
            name="whatsappNumber"
            placeholder="Número do WhatsApp"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Seu email"
            required
          />

          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Seu endereço"
            required
          />

          <button type="submit">Enviar</button>
        </div>
        {!loading && <input type="submit" value="Salvar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default Profile;
