import React, { Component } from "react";
import styles from "./Modal.module.css";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.checkEvent);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.checkEvent);
  }

  checkEvent = (evt) => {
    if (evt.key === "Escape" || evt.target === evt.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className={styles.Overlay} onClick={this.checkEvent}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
