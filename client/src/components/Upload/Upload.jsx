import "./Upload.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavPostLogin from "../NavPostLogin/NavPostLogin";
import Modal from "react-modal";

const API_URL = "http://localhost:8080";
Modal.setAppElement("#root");

export default class Upload extends Component {
  state = {
    car: "",
    description: "",
    isModalOpen: false,
    selectedFile: null,
    image: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      image: `${API_URL}/${e.target.files[0].name}`,
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(`${API_URL}/posts/upload`, data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    const { car, description, image } = this.state;
    if (!car || !description || !image) {
      this.openModal();
    } else {
      axios
        .post(`${API_URL}/posts`, { car, description, image })
        .then((res) => {
          alert("Your post has been added to recent.");
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ car: "", description: "", image: null });
    }
  };

  render() {
    const { car, description } = this.state;

    return (
      <div className="upload">
        <NavPostLogin />
        <h1 className="upload__heading">New Post</h1>
        <form
          className="upload__form"
          onSubmit={this.onSubmit}
          encType="multipart/form-data"
        >
          <input
            className="upload__input"
            type="text"
            label="Car"
            placeholder="Car"
            value={car}
            name="car"
            onChange={this.onChange}
          />
          <textarea
            className="upload__input upload__textarea"
            type="text"
            label="Description"
            placeholder="Description"
            value={description}
            name="description"
            onChange={this.onChange}
          />
          <div className="upload__image-wrapper">
            <button className="upload__image-btn upload__btn">
              SELECT IMAGE
            </button>
            <input
              type="file"
              className="upload__image-selector"
              name="image"
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="upload__btn-wrapper">
            <button className="upload__btn upload__btn-cancel">
              <Link className="upload__link" to="/home">
                CANCEL
              </Link>
            </button>
            <button className="upload__btn" onClick={this.onSubmit}>
              POST
            </button>
          </div>
          <Modal
            className="upload__modal"
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(32, 32, 32, 0.75)",
              },
            }}
          >
            <h1 className="upload__modal-heading">
              We need to know more about your post!
            </h1>
            <button className="upload__modal-btn" onClick={this.closeModal}>
              GOT IT
            </button>
          </Modal>
        </form>
      </div>
    );
  }
}
