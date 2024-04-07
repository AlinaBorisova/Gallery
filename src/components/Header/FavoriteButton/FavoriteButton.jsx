import style from './FavoriteButton.module.css';
import {ReactComponent as LikeIcon} from '../img/like.svg';
import {useNavigate} from 'react-router-dom';

export const FavoriteButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/favorite');
  };

  return (
    <div className={style.container}>
      <button onClick={handleClick}>
        <LikeIcon />
      </button>
    </div>
  );
};
