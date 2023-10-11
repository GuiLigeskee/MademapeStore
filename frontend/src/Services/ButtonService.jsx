import { api, requestConfig } from "../utils/config";

const createButtonService = async (formData, token) => {
  const config = requestConfig("POST", formData, token);

  try {
    const res = await fetch(api + "/button/create", config);

    if (!res.ok) {
      throw new Error("Erro ao criar o botão.");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Erro ao criar o botão: " + error.message);
  }
};

// Get user photos
const getUserButtons = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/button/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const ButtonService = {
  createButtonService,
  getUserButtons,
};

export default ButtonService;
