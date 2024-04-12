import style from './Main.module.css';
import List from './List';
import Layout from '../Layout';
import {Route, Routes} from 'react-router-dom';
import {PhotoPage} from '../PhotoPage/PhotoPage';
import NotFound from '../NotFound';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path='/auth' element={<List />} />
        <Route path='/' element={<List />} />
        <Route path='/search' element={<List />} />
        <Route path='/photo/:id' element={<PhotoPage />} />
        <Route path='/favorite' element={<List />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  </main>
);
