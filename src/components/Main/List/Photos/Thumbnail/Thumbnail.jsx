// import style from './Thumbnail.module.css';
import PropTypes from 'prop-types';

export const Thumbnail = ({src, alt, width, height, className}) => (
  <img
    className={className}
    src={src}
    alt={alt}
    width={width}
    height={height}
  />
);

Thumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};
