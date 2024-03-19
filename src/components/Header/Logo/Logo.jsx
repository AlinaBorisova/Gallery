import style from './Logo.module.css';
import logo from './img/logo.svg';
import {Link} from 'react-router-dom';

export const Logo = () => (
  <div className={style.link}>
    <Link to={`/`}>
      <img
        className={style.logo}
        src={logo}
        alt="Logo Gallery"
      />
    </Link>
  </div>
);
