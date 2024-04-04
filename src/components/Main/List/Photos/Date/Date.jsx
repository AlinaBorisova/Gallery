import style from './Date.module.css';
import formatDate from '../../../../../utils/formatDate';
import PropTypes from 'prop-types';

export const Date = ({date}) => (
  date && <time className={style.date} dateTime={date}>
    {formatDate(date)}
  </time>
);

Date.propTypes = {
  date: PropTypes.string,
};
