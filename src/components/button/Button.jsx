import React from 'react';
import styles from "./Button.module.css";

const Button = ({ fetchMoreImages, label }) => {
  return (
    <button
     type="button"
     className={styles.Button}
     onClick={fetchMoreImages}
     >
      {label}
    </button>
  )
}

export default Button;
