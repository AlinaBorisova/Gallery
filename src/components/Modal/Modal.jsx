import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {ReactComponent as ErrorIcon} from './img/error.svg';
import {useEffect} from 'react';

export const Modal = ({closeModal}) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 2500);
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2 className={style.title}>Вы не авторизованы</h2>
        <ErrorIcon/>
      </div>
    </div>,
    document.body,
  );
};
