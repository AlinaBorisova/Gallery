import style from './FavoriteButton.module.css';
import {ReactComponent as LikeIcon} from './img/like.svg';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import Modal from '../../Modal';

export const FavoriteButton = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const token = useSelector(state => state.token.token);

  const handleClick = () => {
    if (token) {
      navigate('/favorite');
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className={style.container}>
      <button onClick={handleClick}>
        <LikeIcon />
      </button>
      {showModal && <Modal closeModal={() => setShowModal(false)}/>}
    </div>
  );
};
