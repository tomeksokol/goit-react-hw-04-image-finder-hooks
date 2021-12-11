import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './FetchLoader.module.css';

const FetchLoader = () => {
  return (
    <div className={styles.overlay}>
      <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={0}
      />
    </div>
  )
}

export default FetchLoader;
