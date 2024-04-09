import style from './ButtonUp.module.css';
import {ReactComponent as ArrowIcon} from './img/arrowUp.svg';
import {useLocation, useNavigate} from 'react-router-dom';

export const ButtonUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    navigate(location.pathname);
  };


  return (
    <div className={style.container} >
      <button onClick={handleClick}>
        <ArrowIcon />
      </button>
    </div>
  );
};
