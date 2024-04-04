import style from './Author.module.css';
import {Text} from '../../../../../UI/Text';
import PropTypes from 'prop-types';

export const Author = ({photo}) => (
  <div className={style.wrapper}>
    <Text As='a' href={photo.user.links.self} className={style.title}>
      <p>{photo.user.username}</p>
    </Text>
  </div>
);

Author.propTypes = {
  photo: PropTypes.object,
};
