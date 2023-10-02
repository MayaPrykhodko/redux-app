import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../actions/userLogin';
import { fetchUser } from '../actions/fetchUser';
import { userRegister } from '../actions/userRegister';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    registerLoading: false,
    token: null,
    user: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.registerLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.registerLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.registerLoading = false;
        state.token = null;
        state.user = null;
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.registerLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.registerLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.registerLoading = false;
        state.token = null;
        state.data = null;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
