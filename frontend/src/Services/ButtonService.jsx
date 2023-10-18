import { api, requestConfig } from "../utils/config";

// // Get button details
// const buttonDetails = async (id) => {
//   const config = requestConfig("GET");

//   try {
//     const res = await fetch(api + "/button/details/" + id, config)
//       .then((res) => res.json())
//       .catch((err) => err);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

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

// Update a photo
const updateButtonService = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/button/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};
// // Update a photo
// const updateButtonService = async (buttonData, token, id) => {
//   const config = requestConfig("PUT", buttonData, token);

//   try {
//     const res = await fetch(api + "/button/" + id, config)
//       .then((res) => res.json())
//       .catch((err) => err);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Delete a button
const deleteButton = async (id, token) => {
  const config = requestConfig("DELETE", "", token);

  try {
    const res = await fetch(api + "/button/" + id, config)
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
  updateButtonService,
  deleteButton,
};

export default ButtonService;
