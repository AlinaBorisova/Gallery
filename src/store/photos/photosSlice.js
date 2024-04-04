import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ACCESS_KEY, URL_API} from '../../api/const';

export const photosRequestAsync = createAsyncThunk(
  'fetch/fetchPhotos',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().token.token;
      let page = getState().photos.page;
      const response = await fetch(
        `${URL_API}/photos?per_page=30&${page && `page=${page}`}`,
        token ?
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } : {
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          },
      );

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: 'Не удалось загрузить фотографии',
        });
      }
      page++;

      const photos = await response.json();
      return {photos, page};
    } catch (error) {
      return error;
    }
  });

export const searchRequestAsync = createAsyncThunk(
  'fetch/fetchSearch',
  async (search, {getState, rejectWithValue}) => {
    try {
      const token = getState().token.token;
      let page = getState().photos.page;
      const response = await fetch(
        `${URL_API}/search/photos?per_page=30&page=${page}&query=${search}`,
        token ?
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } : {
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          },
      );

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: 'Не удалось загрузить фотографии',
        });
      }
      page++;

      const photos = await response.json();
      return {photos, page};
    } catch (error) {
      return error;
    }
  });

const initialState = {
  photos: [],
  status: '',
  error: '',
  page: 1,
  params: '',
  loadingPhotos: false,
  loadingSearch: false,
  search: '',
  pageSearch: 1,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.photos = [];
      state.loading = false;
      state.error = null;
      state.page = 1;
      state.pageSearch = 1;
      state.params = action.payload;
      state.search = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(photosRequestAsync.pending, (state) => {
        state.loadingPhoto = true;
        state.error = null;
        state.status = '';
      })
      .addCase(photosRequestAsync.fulfilled, (state, action) => {
        state.photos = [...state.photos, ...action.payload.photos];
        state.loadingPhoto = false;
        state.error = null;
        state.page = action.payload.page;
        state.status = '';
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.loadingPhoto = false;
        state.error = action.payload.error;
        state.status = action.payload.status;
      })
      .addCase(searchRequestAsync.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
        state.status = '';
      })
      .addCase(searchRequestAsync.fulfilled, (state, action) => {
        if (state.search === action.meta.arg) {
          state.photos = [...state.photos, ...action.payload.photos.results];
        } else {
          state.photos = action.payload.photos.results;
          state.search = action.meta.arg;
        }
        state.loadingSearch = false;
        state.error = null;
        state.page = action.payload.page;
        state.status = '';
      })
      .addCase(searchRequestAsync.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.payload.error;
        state.status = action.payload.status;
      });
  },
});


export const {changePage} = photosSlice.actions;
export default photosSlice.reducer;
