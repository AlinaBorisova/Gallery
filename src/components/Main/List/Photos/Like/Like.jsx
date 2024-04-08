import style from './Like.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {ReactComponent as LikeIcon} from '../img/like.svg';
import {useState} from 'react';
import Layout from '../../../../Layout';
import {useDispatch, useSelector} from 'react-redux';
import {
  likeDeleteAsync,
  likePostAsync,
} from '../../../../../store/like/likeSlice';
import Modal from '../../../../Modal';

// Не обновляется значение на странице

export const Like = ({likes, liked, id}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [showModal, setShowModal] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLikedByUser, setIsLikedByUser] = useState(liked);
  const [activeBtn, setActiveBtn] = useState(liked);
  // console.log('activeBtn', activeBtn);
  // console.log('isLikedByUser', isLikedByUser);
  // console.log('liked', photo.liked_by_user);
  // console.log('likes', likes);

  const handleLikeClick = () => {
    if (!token) {
      setShowModal(true);
    } else {
      if (isLikedByUser) {
        setLikeCount(likeCount - 1);
        dispatch(likeDeleteAsync(id));
        setIsLikedByUser(!isLikedByUser);
        setActiveBtn(false);
      }
      if (!isLikedByUser) {
        setLikeCount(likeCount + 1);
        dispatch(likePostAsync(id));
        setIsLikedByUser(!isLikedByUser);
        setActiveBtn(true);
      }
    }
  };

  // useEffect(() => {
  //   if (!activeBtn) return;
  //
  //   if (isLikedByUser) {
  //     dispatch(likePostAsync(id));
  //   }
  //   if (!isLikedByUser) {
  //     dispatch(likeDeleteAsync(id));
  //   }
  // }, [isLikedByUser]);

  return (
    <Layout>
      <button
        className={classNames(style.btnWrapper,
          activeBtn && style.likeActive)}
        onClick={handleLikeClick}>
        <LikeIcon />
        <span>{likeCount}</span>
      </button>
      {showModal && <Modal />}
    </Layout>
  );
};

Like.propTypes = {
  likes: PropTypes.number,
  liked: PropTypes.bool,
  id: PropTypes.string,
};
