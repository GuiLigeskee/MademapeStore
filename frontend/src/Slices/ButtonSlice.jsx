import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ButtonService from "../Services/ButtonService";

const initialState = {
  buttons: [],
  button: null,
  error: null,
  loading: false,
  message: null,
};

export const createButton = createAsyncThunk(
  "button/publish",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      const data = await ButtonService.createButtonService(formData, token);

      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createButton.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createButton.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.button = action.payload;
        state.message = "Botão criado com sucesso!";
      })
      .addCase(createButton.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = buttonSlice.actions;
export default buttonSlice.reducer;
