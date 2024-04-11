import style from './ButtonUp.module.css';
import {ReactComponent as ArrowIcon} from './img/arrowUp.svg';

export const ButtonUp = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={style.container} >
      <button onClick={handleClick}>
        <ArrowIcon />
      </button>
    </div>
  );
};
