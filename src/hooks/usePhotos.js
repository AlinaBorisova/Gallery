// import {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {photosRequestAsync} from '../store/photos/photosSlice';
//
// export const usePhotos = () => {
//   const posts = useSelector(state => state.photos.photos);
//   const token = useSelector(state => state.token.token);
//   const loading = useSelector(state => state.photos.loading);
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     dispatch(photosRequestAsync());
//   }, [token]);
//
//   return [posts, loading];
// };
