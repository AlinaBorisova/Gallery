import style from './Main.module.css';
import List from './List';
import Layout from '../Layout';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <List />
    </Layout>
  </main>
);
