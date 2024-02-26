import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Auth from './Auth';

export const Header = () => (
  <header className={style.header}>
    <Layout>
      <div className={style.header__container}>
        <Logo />
        <Auth />
      </div>
    </Layout>
  </header>
);
