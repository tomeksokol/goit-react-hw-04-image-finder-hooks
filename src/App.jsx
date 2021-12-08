import "./App.css";
import { useState, useEffect } from "react";
import Searchbar from "./components/searchbar/Searchbar";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import getImages from "./utils/apiCalls";
// import axios from "axios";
// import { imgUrl, getData } from './../src/utils/apiCalls';

const imgUrl = (keyWord = "nature", page = 1) =>
  `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=23580980-4f75151f85975025bb6074227&image_type=photo&orientation=horizontal&per_page=12`;

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [page, setPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {

  }, []);

  const onSubmit = (value) => {
    setIsLoading(true);
    setKeyWord(value);
    setPage(1);
    getImages(value, 1)
      .then(({ total, hits }) => {
        setTotal(total);
        setImageList(hits);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Searchbar onSubmit={onSubmit}/>
        <ImageGallery />
        <Button />
      </header>
    </div>
  );
}

export default App;
