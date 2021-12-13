import { useState, useEffect } from "react";
import "./App.css";

import Searchbar from "./components/searchbar/Searchbar";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import ErrorAlert from "./components/error/ErrorAlert";
import FetchLoader from "./components/loader/FetchLoader";
import Modal from "./components/modal/Modal";

import fetchData from "./utils/apiCalls";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  //States

  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");

  //Function

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: "smooth",
      });
    }, 1000);
  };

  const searchImages = (newSearch) => {
    setKeyword(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  //Events

  const loadMore = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
    // fetchImages();
    scrollPage();
  };

  const openModal = (evt) => {
    setLargeImageURL(evt.target.dataset.source);
    setTags(evt.target.alt);
    toggleModal();
  };

  //Fetches

  const fetchInitialView = () => {
    fetch(
      `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=15`
    )
      .then((data) => data.json())
      .then((keyword) => {
        setImages(keyword.hits);
        setShowButton(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchInitialView();
  }, []);

  useEffect(() => {
    if (!keyword) return;

    const fetchImages = async () => {
      try {
        const request = await fetchData(keyword, page);

        if (request.length === 0) {
          return setError(`😐 No results were found for: ${keyword}`);
        }
        setImages((prevImages) => [...prevImages, ...request]);
      } catch (error) {
        setError("😱 Something went wrong. Try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [keyword, page]);

  return (
    <div className="App">
      <Searchbar onHandleSubmit={searchImages} />

      {error && <ErrorAlert textError={error} />}

      {images.length > 0 && !error && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {isLoading && <FetchLoader />}

      {!showButton && !isLoading && images.length >= 15 && !error && (
        <Button label={"Load more"} fetchMoreImages={loadMore} />
      )}

      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          toggleModal={toggleModal}
        />
      )}

      <ToastContainer autoClose={3700} />
    </div>
  );
}

export default App;
