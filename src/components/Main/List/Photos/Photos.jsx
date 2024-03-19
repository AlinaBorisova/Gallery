import style from './Photos.module.css';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import {Author} from './Author/Author';
import Date from './Date';
import {Like} from './Like/Like';

export const Photos = ({photo}) => {
  const {
    id,
    urls,
    alt_description: altDescription,
    likes,
    created_at: date,
  } = photo;

  return (
    <>
      <div className={style.photoWrapper} id={id}>
        <Thumbnail
          className={style.image}
          src={urls.small}
          alt={altDescription}
        />
        <div className={style.descriptionWrapper}>
          <div className={style.description}>
            <Author photo={photo}/> {/* Не работает ссылка на профиль*/}
            <Date date={date} />
          </div>
          <Like likes={likes}/>
        </div>
      </div>
    </>

  );
};

Photos.propTypes = {
  photo: PropTypes.object,
};
