import React from "react";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  openModal,
}) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img 
      className={styles.ImageGalleryItemImage} 
      src={webformatURL} 
      alt={tags}
      data-source={largeImageURL}
      onClick={openModal}
      loading="lazy"
      />
    </li>
  );
};

export default ImageGalleryItem;
