import style from './Auth.module.css';
import {Text} from '../../../UI/Text';
import {ReactComponent as LoginIcon} from './img/auth.svg';
import {urlAuth} from '../../../api/auth';
import {useAuth} from '../../../hooks/useAuth';
import {useDispatch, useSelector} from 'react-redux';
import {removeToken} from '../../../store/token/tokenSlice';
import {useEffect, useState} from 'react';
import {fetchToken} from '../../../store/token/tokenSlice';
import {useNavigate} from 'react-router-dom';

export const Auth = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);
  const [auth, clearAuth] = useAuth();
  const [showBtn, setShowBtn] = useState(false);
  const navigate = useNavigate();

  const getOut = () => {
    if (!showBtn) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };

  const logOut = () => {
    dispatch(removeToken());
    clearAuth();
    setShowBtn(false);
    navigate('/');
  };

  useEffect(() => {
    if (!token) {
      dispatch(fetchToken());
    }
  }, [dispatch, token]);

  return (
    <div className={style.container}>
      {
      auth.name ? (
        <div className={style.btn}>
          <img
            className={style.img}
            src={auth.profile_image.small}
            title={auth.username}
            alt={`Аватар ${auth.name}`}
            onClick={getOut}
          />
          {!showBtn ? (
              <span className={style.userName}>
                {auth.username}
              </span>
            ) : (
              <button className={style.logout} onClick={logOut}>
                Выйти
              </button>
            )}
        </div>
      ) : (
    <Text As='a' className={style.authLink} href={urlAuth}>
      <LoginIcon className={style.svg} />
    </Text>
      )}
    </div>
  );
};
