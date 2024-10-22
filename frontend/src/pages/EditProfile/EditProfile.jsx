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

  const [userUrl, setUserUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [colorTheme, setColorTheme] = useState("#000000" || "#rrggbb");
  const [darkTheme, setDarkTheme] = useState(false);
  const [contactButtons, setContactButtons] = useState(false);
  const [work, setWork] = useState("");
  const [typeIcons, setTypeIcons] = useState(false);
  const [tell, setTell] = useState("");
  const [pix, setPix] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
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
      setBio(user.bio);
      setColorTheme(user.colorTheme);
      setDarkTheme(user.darkTheme);
      setWork(user.work);
      setTypeIcons(user.typeIcons);
      setTell(user.tell);
      setPix(user.pix);
      setWhatsapp(user.whatsapp);
      setAddress(user.address);
      setUserUrl(user.userUrl);
      setContactButtons(user.contactButtons);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (password) {
      userData.password = password;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (colorTheme) {
      userData.colorTheme = colorTheme;
    }

    if (address) {
      userData.address = address;
    }

    if (userUrl) {
      userData.userUrl = userUrl;
    }

    if (work) {
      userData.work = work;
    }

    if (typeIcons !== undefined && typeIcons !== null) {
      userData.typeIcons = typeIcons;
    }

    if (darkTheme !== undefined && darkTheme !== null) {
      userData.darkTheme = darkTheme;
    }

    if (whatsapp) {
      userData.whatsapp = whatsapp;
    }

    if (tell) {
      userData.tell = tell;
    }

    if (pix) {
      userData.pix = pix;
    }

    if (contactButtons !== undefined && contactButtons !== null) {
      userData.contactButtons = contactButtons;
    }

    console.log(darkTheme);

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
          <input
            type="color"
            name="text-color"
            id="text-color"
            onChange={(e) => setColorTheme(e.target.value)}
            value={colorTheme || "#000000"}
          />
        </label>
        <label>
          <div className="switch-container">
            <span>Tema escuro</span>
            <div className="toggle-switch">
              <label id="switch-label">
                <input
                  type="checkbox"
                  className="switch-input"
                  onChange={(e) => setDarkTheme(e.target.checked)}
                  checked={darkTheme}
                />
                <span className="slider-2" id="switch-span"></span>
              </label>
            </div>
          </div>
        </label>
        <hr />
        {/* <label>
          <span>Nome de usuário</span>
          <div className="input-row">
            <p>mademapestore/user-page/</p>
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => setUserUrl(e.target.value)}
              value={userUrl || ""}
            />
          </div>
        </label> */}
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
          <input
            type="text"
            placeholder="cargo ou area de atuação"
            onChange={(e) => setWork(e.target.value)}
            value={work || ""}
          />
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
        <div className="form2">
          <label>
            <div className="switch-container">
              <span>Botões de contato</span>
              <div className="toggle-switch">
                <label id="switch-label">
                  <input
                    type="checkbox"
                    className="switch-input"
                    onChange={(e) => setContactButtons(e.target.checked)}
                    checked={contactButtons}
                  />
                  <span className="slider-2" id="switch-span"></span>
                </label>
              </div>
            </div>
          </label>

          {contactButtons && (
            <div>
              <label htmlFor="phoneNumber">
                <span>Telefone</span>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Número de telefone"
                  onChange={(e) => setTell(e.target.value)}
                  value={tell || ""}
                />
              </label>

              <label htmlFor="whatsappNumber">
                <span>WhatsApp</span>
                <input
                  type="text"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  placeholder="Número do WhatsApp"
                  onChange={(e) => setWhatsapp(e.target.value)}
                  value={whatsapp || ""}
                />
                <p id="obs">
                  Para número Brasileiro, iniciar com 55 + DDD + Número. Para
                  número Internacional, colocar o código do país (DDI). Caso
                  seja um número especial (por exemplo 0800 ou 4004) digitar
                  livremente.
                </p>
              </label>

              <label htmlFor="email">
                <span>Email</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Seu email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email || ""}
                />
              </label>

              <label htmlFor="address">
                <span>Endereço</span>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Seu endereço"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address || ""}
                />
              </label>

              <label htmlFor="pix">
                <span>Chave pix</span>
                <input
                  type="text"
                  name="pix"
                  id="pix"
                  placeholder="Digite sua chave pix"
                  onChange={(e) => setPix(e.target.value)}
                  value={pix || ""}
                />
              </label>
            </div>
          )}
        </div>
        <label>
          <span>Alterar senha</span>
          <input
            type="password"
            placeholder="Digite sua nova senha..."
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Salvar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default Profile;
