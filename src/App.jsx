import React, { Component } from "react";
import "./App.css";

import Searchbar from "./components/searchbar/Searchbar";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import ErrorAlert from "./components/error/ErrorAlert";
import FetchLoader from "./components/loader/FetchLoader";
import Modal from "./components/modal/Modal";

import fetchData from "./utils/apiCalls";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

class App extends Component {
  //States

  state = {
    keyword: "",
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    error: null,
    totalPages: 0,
    showButton: true,
    largeImageURL: "",
    tags: "",
  };

  //Function
  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: "smooth",
      });
    }, 1000);
  };

  //Events

  inputValue = (evt) => {
    this.setState({ keyword: evt.target.value });
  };

  submitValue = (evt) => {
    evt.preventDefault();
    this.fetchImages();
  };

  loadMore = (evt) => {
    evt.preventDefault();
    this.fetchImages();
    this.scrollPage();
  };

  openModal = (evt) => {
    this.setState(({ largeImageURL, tags }) => ({
      largeImageURL: evt.target.dataset.source,
      tags: evt.target.alt,
    }));
    this.toggleModal();
  };

  //Fetches

  fetchInitialView = () => {
    fetch(
      `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=15`
    )
      .then((data) => data.json())
      .then((keyword) => {
        this.setState(({ images, showButton }) => ({
          images: keyword.hits,
          showButton: true,
        }));
      })
      .catch((error) => console.log(error));
  };

  fetchImages = async () => {
    if (this.state.keyword.trim() === "") {
      return toast.info("🤔 Please enter a value to search images");
    }
    this.toggleLoader();

    try {
      const request = await fetchData(this.state.keyword, this.state.page);
      this.setState(({ images, page, showButton }) => ({
        images: [...images, ...request],
        page: page + 1,
        showButton: false,
      }));

      if (request.length === 0) {
        this.setState({
          error: `😐 No results were found for: ${this.state.keyword}`,
        });
      }
    } catch (error) {
      this.setState({ error: "😱 Something went wrong. Try again" });
    } finally {
      this.toggleLoader();
    }
  };

  // Life cycles
  componentDidMount() {
    this.fetchInitialView();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.keyword !== this.state.keyword) {
      this.setState({ images: [], page: 1, error: null });
    }
  }

  render() {
    return (
      <div className="App">
        <Searchbar
          onSubmit={this.submitValue}
          inputChange={this.inputValue}
          value={this.state.keyword}
        />

        {this.state.error && <ErrorAlert textError={this.state.error} />}

        <ImageGallery images={this.state.images} openModal={this.openModal} />

        {this.state.isLoading && <FetchLoader />}

        {!this.state.showButton &&
          !this.state.isLoading &&
          this.state.images.length >= 15 &&
          !this.state.error && (
            <Button label={"Load more"} fetchMoreImages={this.loadMore} />
          )}

        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            tags={this.state.tags}
            toggleModal={this.toggleModal}
          />
        )}

        <ToastContainer autoClose={3700} />
      </div>
    );
  }
}

export default App;
