import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {ReactComponent as ErrorIcon} from './img/error.svg';
import {ReactComponent as CloseIcon} from './img/close.svg';
import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

export const Modal = () => {
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  const handleClick = e => {
    const target = e.target;
    if (target === overlayRef.current) {
      navigate(`/`);
    }
  };

  const handleEsc = ({key}) => {
    if (key === 'Escape') navigate(`/`);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleClick);
      document.addEventListener('keydown', handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <h2 className={style.title}>Вы не авторизованы</h2>
        <ErrorIcon/>
        <button className={style.close}
          onClick={() => navigate(`/`)}
        >
          <CloseIcon/>
        </button>
      </div>
    </div>,
    document.body,
  );
};
