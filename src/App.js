import Header from './components/Header';
import Main from './components/Main';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route
        path='*'
        element={
          <>
            <Header />
            <Main />
          </>
        }/>
    </Routes>
  );
}

export default App;
