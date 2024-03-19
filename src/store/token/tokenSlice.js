import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getUrlToken} from '../../api/token';

export const setToken = token => {
  const oldToken = localStorage.getItem('Token');
  if (oldToken === token) return;

  localStorage.setItem('Token', token);
};

export const fetchToken = createAsyncThunk(
  'fetch/fetchToken',
  async (_, {getState}) => {
    let token = getState().token.token;
    if (token) return;

    if (window.location.pathname.includes('/auth')) {
      const code = new URLSearchParams(window.location.search).get('code');
      const urlToken = getUrlToken(code);

      const response = await fetch(urlToken);

      if (!response.ok) {
        throw new Error('Error with getting token');
      }

      const data = await response.json();
      token = data.access_token;
      setToken(token);
      return token;
    }
    return token;
  }
);

const initialState = {
  token: localStorage.getItem('Token'),
  loading: false,
  error: '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.token;
    },
    removeToken: state => {
      state.token = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchToken.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = '';
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.loading = false;
        state.token = '';
        state.error = action.error;
      });
  }
});

export default tokenSlice.reducer;
export const {updateToken, removeToken} = tokenSlice.actions;
