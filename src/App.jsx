import React, { Component } from "react";
import "./App.css";

import Searchbar from "./components/searchbar/Searchbar";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import ErrorAlert from "./components/error/ErrorAlert";

import fetchData from "./utils/apiCalls";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


class App extends Component {
  state = {
    keyword: "",
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    error: null,
  };

  inputValue = (evt) => {
    this.setState({ keyword: evt.target.value });
  };

  submitValue = (evt) => {
    evt.preventDefault();
    this.fetchImages();
  };

  fetchInitialView = () => {
    fetch(
      `https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=12`
    )
      .then((data) => data.json())
      .then((keyword) => {
        this.setState({ images: keyword.hits });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.fetchInitialView();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.keyword !== this.state.keyword) {
      this.setState({ images: [], page: 1, error: null });
    }
  }

  fetchImages = async () => {
    if (this.state.keyword.trim() === "") {
      return toast.info("🤔 Please enter a value to search images");
    }

    try {
      const request = await fetchData(this.state.keyword, this.state.page);
      this.setState(({ images, page }) => ({
        images: [...images, ...request],
        page: page + 1,
      }));

      if (request.length === 0) {
        this.setState({
          error: `😐 No results were found for: ${this.state.keyword}`,
        });
      }
    } catch (error) {
      this.setState({ error: "😱 Something went wrong. Try again" });
    } finally {
    }
  };

  render() {
    return (
      <div className="App">
        <Searchbar
          onSubmit={this.submitValue}
          inputChange={this.inputValue}
          value={this.state.keyword}
        />
        {this.state.error && <ErrorAlert textError={this.state.error} />}
        <ImageGallery images={this.state.images} />
        <Button />
        <ToastContainer autoClose={3700} />
      </div>
    );
  }
}

export default App;
