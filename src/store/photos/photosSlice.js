import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ACCESS_KEY, URL_API} from '../../api/const';

export const photosRequestAsync = createAsyncThunk(
  'fetch/fetchPhotos',
  async (_, {getState}) => {
    const token = getState().token.token;
    let page = getState().photos.page;

    const response = await fetch(`
      ${URL_API}/photos?per_page=30&${page && `page=${page}`}`,
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
      throw new Error('Authorization error');
    }
    page++;

    const photos = await response.json();
    if (photos) return {photos, page};
  });

const initialState = {
  photos: [],
  status: '',
  error: '',
  page: 1,
  params: '',
  loadingPhoto: false,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.photos = [];
      state.error = '';
      state.page = 1;
      state.params = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(photosRequestAsync.pending, state => {
        state.loadingPhoto = true;
        state.status = 'loading';
        state.error = '';
      })
      .addCase(photosRequestAsync.fulfilled, (state, action) => {
        state.photos = [...state.photos, ...action.payload.photos];
        state.loadingPhoto = false;
        state.status = 'loaded';
        state.page = action.payload.page;
        state.error = '';
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.loadingPhoto = false;
        state.status = 'error';
        state.error = action.error;
      });
  }
});

export const {changePage} = photosSlice.actions;
export default photosSlice.reducer;
