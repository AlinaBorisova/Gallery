import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, fetchAuth} from '../store/auth/authSlice';

export const useAuth = () => {
  const token = useSelector(state => state.token.token);
  const auth = useSelector(state => state.auth.data);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(fetchAuth());
  }, [dispatch, token]);

  const clearAuth = () => {
    dispatch(authLogout());
    localStorage.removeItem('Token');
  };

  return [auth, clearAuth, error];
};
