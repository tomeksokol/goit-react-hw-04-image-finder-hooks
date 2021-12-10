import "./App.css";
import { useState, useEffect } from "react";
import Searchbar from "./components/searchbar/Searchbar";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import getImages from "./utils/apiCalls";
// import axios from "axios";
// import { imgUrl, getData } from './../src/utils/apiCalls';

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [page, setPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {}, []);

  const onSubmit = (value) => {
    setIsLoading(true);
    setKeyWord(value);
    setPage(1);
    getImages(value, 1)
      .then(({ total, hits }) => {
        setTotal(total);
        setImageList(hits);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery />
      <Button />
    </div>
  );
}

export default App;
