import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../Services/userService";

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get user details, for edit data
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user, token);

    return data;
  }
);

// Update user details
export const updateProfile = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    console.log(data);

    return data;
  }
);

// Get user details
export const getUserDetails = createAsyncThunk(
  "user/get",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.getUserDetails(id, token);

    return data;
  }
);

export const updateUserPage = createAsyncThunk(
  "user/userpage",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    console.log(data);

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = {};
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateUserPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateUserPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = {};
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
