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

const ButtonService = {
  createButtonService,
};

export default ButtonService;
