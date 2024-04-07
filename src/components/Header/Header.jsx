import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Auth from './Auth';
import Search from './Search';
import {FavoriteButton} from './FavoriteButton/FavoriteButton';

export const Header = () => (
  <header className={style.header}>
    <Layout>
      <div className={style.header__container}>
        <Logo />
        <Search />
        <FavoriteButton />
        <Auth />
      </div>
    </Layout>
  </header>
);
