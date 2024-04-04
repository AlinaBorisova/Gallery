import style from './List.module.css';
import Photos from './Photos';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import {Outlet, useLocation, useSearchParams} from 'react-router-dom';
import {
  changePage,
  photosRequestAsync,
  searchRequestAsync,
} from '../../../store/photos/photosSlice';
import Preloader from '../../../UI/Preloader';
import Masonry from 'react-masonry-css';

// Настроить адаптив, перекрытие стилей

export const List = () => {
  const photos = useSelector(state => state.photos.photos);
  const loadingPhotos = useSelector(state => state.photos.loadingPhotos);
  const loadingSearch = useSelector(state => state.photos.loadingSearch);
  const [searchParam] = useSearchParams();
  const search = searchParam.get('search');
  const dispatch = useDispatch();
  const endList = useRef(null);
  const params = useLocation();


  useEffect(() => {
    dispatch(changePage(params));
  }, [dispatch, params]);

  useEffect(() => {
    if (!loadingPhotos) {
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          dispatch(photosRequestAsync());
        }
      }, {
        rootMargin: '250px',
      });
      if (endList.current && !loadingPhotos) {
        observer.observe(endList.current);
      }

      return () => {
        if (endList.current) {
          observer.unobserve(endList.current);
        }
      };
    }
  }, [dispatch, endList.current, params.pathname, loadingPhotos]);

  useEffect(() => {
    if (params.pathname === '/search' && !loadingSearch) {
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          dispatch(searchRequestAsync(search));
        }
      }, {
        rootMargin: '250px',
      });
      if (endList.current && !loadingSearch) {
        observer.observe(endList.current);
      }

      return () => {
        if (endList.current) {
          observer.unobserve(endList.current);
        }
      };
    }
  }, [dispatch, endList.current, params.pathname, loadingSearch]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
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
             {(loadingPhotos || loadingSearch) && <Preloader />}
             <li ref={endList} className={style.end} />
           </Masonry>
        }
      </ul>
      <Outlet />
    </>
  );
};
