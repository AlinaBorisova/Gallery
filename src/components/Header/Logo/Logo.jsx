import style from './Logo.module.css';
import logo from './img/logo.svg';
import {useNavigate} from 'react-router-dom';

export const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className={style.container}>
      <img
        className={style.logo}
        src={logo}
        alt="Logo Gallery"
        onClick={handleClick}
      />
    </div>
  );
};
