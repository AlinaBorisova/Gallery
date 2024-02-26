import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {URL_API} from '../../api/const';

export const fetchAuth = createAsyncThunk(
  'fetch/fetchAuth',
  async (_, {getState}) => {
    const token = getState().token.token;

    if (!token) return;

    const response = await fetch(`${URL_API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Authorization error');
    }

    return await response.json();
  }
);

const initialState = {
  data: {},
  loading: false,
  status: '',
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      state.data = {};
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, state => {
        state.loading = true;
        state.status = '';
        state.error = '';
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.status = 'login';
        state.error = '';
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loading = false;
        state.status = 'error';
        state.error = action.error;
      });
  }
});

export default authSlice.reducer;
export const {authLogout} = authSlice.actions;
