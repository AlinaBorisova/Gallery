import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {URL_API} from '../../api/const';

export const likePostAsync = createAsyncThunk(
  'post/postLike',
  async (id, {getState}) => {
    const token = getState().token.token;

    const response = await fetch(` ${URL_API}/photos/${id}/like`,
      token && {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (!response.ok) {
      throw new Error('Не удалось поставить лайк');
    }

    const data = await response.json();
    if (data) return data;
  }
);

export const likeDeleteAsync = createAsyncThunk(
  'delete/deleteLike',
  async (id, {getState}) => {
    const token = getState().token.token;

    const response = await fetch(` ${URL_API}/photos/${id}/like`,
      token && {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (!response.ok) {
      throw new Error('Не удалось удалить лайк');
    }

    const data = await response.json();
    if (data) return data;
  }
);

const initialState = {
  likedByUser: '',
  likeCount: 0,
  error: '',
  loading: false,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePostAsync.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        state.likeCount = action.payload.photo.likes;
        state.likedByUser = action.payload.photo.liked_by_user;
        state.error = '';
        state.loading = false;
      })
      .addCase(likePostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(likeDeleteAsync.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(likeDeleteAsync.fulfilled, (state, action) => {
        state.likeCount = action.payload.photo.likes;
        state.likedByUser = action.payload.photo.liked_by_user;
        state.error = '';
        state.loading = false;
      })
      .addCase(likeDeleteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export default likeSlice.reducer;
export const {
  setLike,
  likedPhoto,
  deleteLike
} = likeSlice.actions;
