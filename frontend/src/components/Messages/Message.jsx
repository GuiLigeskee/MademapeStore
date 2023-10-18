import React, { useState, useEffect } from "react";
import "./Message.css";

const Message = ({ msg, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Usando setTimeout para esconder o componente após 2 segundos
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000);

    // Limpar o timeout quando o componente for desmontado
    return () => clearTimeout(timeout);
  }, []);

  return visible ? (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  ) : null;
};

export default Message;
