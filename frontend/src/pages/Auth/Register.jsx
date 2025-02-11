import React from "react";
import "./Auth.css";
import MadeLinkLogo from "../../assets/MadeLink.jpeg";

// Components
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Messages/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

// Redux
import { register, reset } from "../../Slices/AuthSlice";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const navigate = useNavigate();

  const { user, message, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
    resetMessage();
  };

  // Clean all auth states and redirect after 2 seconds if the user is logged in
  useEffect(() => {
    if (user) {
      const redirectTimeout = setTimeout(() => {
        navigate("/profile");
      }, 500);

      return () => clearTimeout(redirectTimeout);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  return (
    <div className="register">
      <p>
        <img src={MadeLinkLogo} alt="Made Link" id="logo" />
      </p>
      <p className="subtitle">Cadastre-se para fazer parte da comunidade.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
      <p>
        Já possui uma conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
