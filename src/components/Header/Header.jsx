import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Auth from './Auth';
import Search from './Search';

export const Header = () => (
  <header className={style.header}>
    <Layout>
      <div className={style.header__container}>
        <Logo />
        <Search />
        <Auth />
      </div>
    </Layout>
  </header>
);
