
import React from 'react';
import css from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, largeImageURL, tags } = image;

  const handleClick = () => {
    openModal({ largeImageURL, tags });
  };

  return (
    <li className={css.galleryItem} onClick={handleClick}>
      <img src={webformatURL} className={css.galleryItemImage} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
