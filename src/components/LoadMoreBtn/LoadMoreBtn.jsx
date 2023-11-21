
import React from 'react';
import css from './loadMoreBtn.module.css'


const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" className={css.loadMoreBtn} onClick={onClick}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;

// const LoadMoreBtn = ({ onClick, onScrollUp }) => {
//   const onLoadMoreClick = () => {
//     onClick();
//     onScrollUp();
//   };

//   return (
//     <button type="button" className={css.loadMoreBtn} onClick={onLoadMoreClick}>
//       Load more
//     </button>
//   );
// };




