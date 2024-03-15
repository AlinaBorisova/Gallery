import style from './List.module.css';
import Photos from './Photos';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {
  changePage,
  photosRequestAsync,
} from '../../../store/photos/photosSlice';
import Preloader from '../../../UI/Preloader';
import Masonry from 'react-masonry-css';

export const List = () => {
  const photos = useSelector(state => state.photos.photos);
  console.log('photos', photos);
  const loadingPhoto = useSelector(state => state.photos.loadingPhoto);
  const dispatch = useDispatch();
  const endList = useRef(null);
  const params = useLocation();


  useEffect(() => {
    dispatch(changePage(params));
  }, [dispatch, params]);

  useEffect(() => {
    if (params.pathname === '/' && !loadingPhoto) {
      console.log('pathname === /');
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          dispatch(photosRequestAsync());
        }
      }, {
        rootMargin: '150px',
      });
      console.log(endList.current);
      if (endList.current && !loadingPhoto) {
        observer.observe(endList.current);
      }

      return () => {
        if (endList.current) {
          observer.unobserve(endList.current);
        }
      };
    }
  }, [dispatch, endList.current, params.pathname, loadingPhoto]);

  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
      <ul className={style.list}>
        {photos &&
           <Masonry
             breakpointCols={breakpointColumnsObj}
             className={style.myMasonryGrid}
             columnClassName={style.myMasonryGridColumn}>
             {photos.map((photo) => (
               <li key={photo.id} className={style.listItem}>
                 <Photos photo={photo} />
               </li>
             ))}
             {loadingPhoto && <Preloader />}
             <li ref={endList} className={style.end} />
           </Masonry>
        }
      </ul>
      <Outlet />
    </>
  );
};
