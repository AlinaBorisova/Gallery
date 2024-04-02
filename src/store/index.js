import {configureStore} from '@reduxjs/toolkit';
// import {composeWithDevTools} from '@redux-devtools/extension';
import tokenReducer from './token/tokenSlice';
import authReducer from './auth/authSlice';
import photosReducer from './photos/photosSlice';
import photoReducer from './photo/photoSlice';
import likeReducer from './like/likeSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    photos: photosReducer,
    photo: photoReducer,
    like: likeReducer,
    // searchReducer,
  }
});
// }, composeWithDevTools());

export default store;
