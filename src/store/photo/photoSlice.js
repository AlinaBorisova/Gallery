import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ACCESS_KEY, URL_API} from '../../api/const';

export const photoRequestAsync = createAsyncThunk(
  'fetch/fetchPhoto',
  async (id, {getState}) => {
    const token = getState().token.token;

    const response = await fetch(`
      ${URL_API}/photos/${id}`,
    token ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } : {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Photo is not find');
    }

    const photo = await response.json();
    if (photo) return photo;
  }
);

const initialState = {
  photo: {},
  status: '',
  error: '',
  loadingPhoto: false,
};

const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(photoRequestAsync.pending, state => {
        state.status = 'loading';
        state.error = '';
        state.loadingPhoto = true;
      })
      .addCase(photoRequestAsync.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.error = '';
        state.loadingPhoto = false;
        state.photo = action.payload;
      })
      .addCase(photoRequestAsync.rejected, (state, action) => {
        state.loadingPhoto = false;
        state.status = 'error';
        state.error = action.error;
      });
  }
});

export default photoSlice.reducer;
