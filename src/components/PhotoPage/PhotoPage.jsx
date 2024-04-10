import style from './PhotoPage.module.css';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {photoRequestAsync} from '../../store/photo/photoSlice';
import Preloader from '../../UI/Preloader';
import Thumbnail from '../Main/List/Photos/Thumbnail';
import Author from '../Main/List/Photos/Author';
import Date from '../Main/List/Photos/Date';
import {Like} from '../Main/List/Photos/Like/Like';

export const PhotoPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photo.photo);
  const loadingPhoto = useSelector(state => state.photo.loadingPhoto);

  useEffect(() => {
    dispatch(photoRequestAsync(id));
  }, [dispatch, id, photo.liked_by_user]);

  return (
    <div>
      {loadingPhoto && <Preloader />}
      {Object.keys(photo).length && (
        <div className={style.photoWrapper}>
          <Thumbnail
            className={style.image}
            src={photo.urls.regular}
            alt={photo.altDescription}
          />
          <div className={style.descriptionWrapper}>
            <div className={style.description}>
              <Author photo={photo}/>
              <Date date={photo.created_at} />
            </div>
            <Like likes={photo.likes} liked={photo.liked_by_user} id={id}/>
          </div>
        </div>
      )}
    </div>
  );
};
