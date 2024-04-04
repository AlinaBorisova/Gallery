import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {URL_API} from '../../api/const';

export const likePostAsync = createAsyncThunk(
  'post/postLike',
  async (id, {getState, rejectWithValue}) => {
    const token = getState().token.token;

    try {
      const response = await fetch(`${URL_API}/photos/${id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: 'Не удалось поставить like фотографии.',
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  },
);

export const likeDeleteAsync = createAsyncThunk(
  'delete/deleteLike',
  async (id, {getState, rejectWithValue}) => {
    const token = getState().token.token;

    try {
      const response = await fetch(`${URL_API}/photos/${id}/like`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: 'Не удалось удалить like с фотографии.',
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  },
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
