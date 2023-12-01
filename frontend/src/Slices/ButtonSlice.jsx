import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ButtonService from "../Services/ButtonService";

const initialState = {
  buttons: [],
  button: {},
  error: null,
  loading: false,
  message: null,
};

// Get button TESTE
export const buttonDetails = createAsyncThunk(
  "button/getButton",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await ButtonService.buttonDetails(id, token);

    return data;
  }
);

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

// Get user buttons
export const getUserButtons = createAsyncThunk(
  "button/userbuttons",
  async (id) => {
    const data = await ButtonService.getUserButtons(id);

    return data;
  }
);

// Update a photo
export const updateButton = createAsyncThunk(
  "button/update",
  async (button, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await ButtonService.updateButtonService(
      {
        title: button.title,
        url: button.url,
        icon: button.icon,
        format: button.format,
        backgroundColor: button.backgroundColor,
        colorTitle: button.colorTitle,
      },
      button.id,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Delete a button
export const deleteButton = createAsyncThunk(
  "button/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await ButtonService.deleteButton(id, token);

    console.log(data.errors);
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
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

      .addCase(buttonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buttonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.button = action.payload;
      })

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
      })
      .addCase(getUserButtons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserButtons.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.buttons = action.payload;
      })
      .addCase(updateButton.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateButton.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.buttons.map((button) => {
          if (button._id === action.payload.button._id) {
            return (button.title = action.payload.button.title);
          }
          return button;
        });

        state.message = action.payload.message;
      })
      .addCase(updateButton.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.button = null;
      })
      .addCase(deleteButton.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteButton.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.buttons = state.buttons.filter((button) => {
          return button._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(deleteButton.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.button = null;
      });
  },
});

export const { resetMessage } = buttonSlice.actions;
export default buttonSlice.reducer;
