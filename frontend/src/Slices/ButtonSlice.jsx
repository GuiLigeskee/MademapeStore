import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ButtonService from "../Services/ButtonService";

// const button = JSON.parse(localStorage.getItem("button"));

const initialState = {
  button: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Register a user and sign in
// export const createButton = createAsyncThunk(
//   "button/create",
//   async (button, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user.token;

//     const data = await ButtonService.createButtonService(button, token);

//     // Check for errors
//     if (data.errors) {
//       return thunkAPI.rejectWithValue(data.errors[0]);
//     }

//     return data;
//   }
// );

export const createButton = createAsyncThunk(
  "button/create",
  async (button, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await ButtonService.createButtonService(button, token);

    console.log(data.errors);
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);
export const buttonSlice = createSlice({
  name: "publish",
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
        state.success = true;
        state.error = null;
        state.button = action.payload;
        state.buttons.unshift(state.button);
        state.message = "Botão criado com sucesso!";
      })
      .addCase(createButton.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.button = null;
      });
  },
});

export const { resetMessage } = buttonSlice.actions;
export default buttonSlice.reducer;
