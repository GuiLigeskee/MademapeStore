import { api, requestConfig } from "../utils/config";

// Buscar informações do usuário
export const fetchUserPageData = async (userId) => {
  try {
    const config = requestConfig("GET");
    const res = await fetch(api + `/userpage/${userId}`, config);
    const userData = await res.json();

    if (res.ok) {
      return userData;
    } else {
      throw new Error(
        userData.error || "Erro ao buscar informações do usuário"
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Atualizar a página do usuário
export const updateUserPageData = async (
  userId,
  { backgroundImage, nameColor }
) => {
  try {
    const config = requestConfig("PUT", { backgroundImage, nameColor });
    const res = await fetch(api + `/userpage/update/${userId}`, config);
    const responseData = await res.json();

    if (res.ok) {
      return responseData;
    } else {
      throw new Error(
        responseData.error || "Erro ao atualizar a página do usuário"
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
