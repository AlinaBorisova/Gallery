import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './token/tokenSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    // commentReducer,
    // postDataReducer,
    // commentsReducer,
    // searchReducer,
  }
});

export default store;
