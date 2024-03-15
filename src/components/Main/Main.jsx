import style from './Main.module.css';
import List from './List';
import Layout from '../Layout';
import {Route, Routes} from 'react-router-dom';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        {/* <Route path='/auth?' element={<List />} />*/}
        <Route path='/' element={<List />} />
      </Routes>
    </Layout>
  </main>
);
