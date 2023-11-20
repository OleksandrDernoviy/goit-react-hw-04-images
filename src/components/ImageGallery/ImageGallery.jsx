
import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import css from './imageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.imageGalleryList}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;