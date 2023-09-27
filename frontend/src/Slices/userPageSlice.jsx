import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserPageData,
  updateUserPageData,
} from "../Services/userPageService";

const initialState = {
  user: null,
  buttons: [],
  error: null,
  loading: false,
  success: false,
};

// Buscar informações do usuário
export const fetchUserPage = createAsyncThunk(
  "userPage/fetchUserPage",
  async (userId, thunkAPI) => {
    try {
      const userData = await fetchUserPageData(userId);
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Atualizar a página do usuário
export const updateUserPage = createAsyncThunk(
  "userPage/updateUserPage",
  async ({ userId, backgroundImage, nameColor }, thunkAPI) => {
    try {
      const response = await updateUserPageData(userId, {
        backgroundImage,
        nameColor,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userPageSlice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload.user;
        state.buttons = action.payload.buttons;
      })
      .addCase(fetchUserPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        // Atualizar os dados do usuário, se necessário
      })
      .addCase(updateUserPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = userPageSlice.actions;
export default userPageSlice.reducer;
