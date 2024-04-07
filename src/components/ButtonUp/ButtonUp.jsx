import style from './ButtonUp.module.css';
import {ReactComponent as ArrowIcon} from './img/arrowUp.svg';
import {useNavigate} from 'react-router-dom';

export const ButtonUp = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={style.container} >
      <button onClick={handleClick}>
        <ArrowIcon />
      </button>
    </div>
  );
};
