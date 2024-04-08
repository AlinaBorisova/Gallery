import style from './NotFound.module.css';

export const NotFound = () => (
  <div className={style.container}>
    <h2 className={style.mainTitle}>Упссс...</h2>
    <h3 className={style.title}>Мы ничего не нашли</h3>
  </div>
);
