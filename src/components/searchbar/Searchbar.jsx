import { useState } from "react";
import styles from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {

  const [value, setValue] = useState('');
  const inputValue = ( {target} ) => {
    setValue(target.value);
  };

  const submitValue = (evt) => {
    evt.preventDefault();
    onSubmit(value);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm}>
        <button type="submit" className={styles.SearchFormButton} onSubmit={submitValue}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={inputValue }
        />
      </form>
    </header>
  );
};

export default Searchbar;
