
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
