import { api, requestConfig } from "../utils/config";

// Create a Button
const createButtonService = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/button/create", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const ButtonService = {
  createButtonService,
};

export default ButtonService;
