import "./Post.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Post({ postData, deletePost }) {
  const date = new Date(postData.timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const timeStamp = `${month}/${day}/${year}`;

  let [likesCount, setLikesCount] = useState(postData.likes);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const incrementLikes = () => {
    setLikesCount(likesCount + 1);
    postData.userName === "U"
      ? alert("You liked your own post")
      : alert(`You liked ${postData.userName}'s Post.`);
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__avatarText">
          <div className="post__avatar">{postData.userName[0]}</div>
          <div className="post__header-text">
            <p className="post__car">{postData.car}</p>
            <p className="post__date">{timeStamp}</p>
          </div>
        </div>
        <Link to={`/home/${postData.id}`}>
          <DeleteIcon
            className="post__deleteIcon"
            style={{ fontSize: "32px" }}
            onClick={openModal}
          />
          <Modal
            className="post__modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(32, 32, 32, 0.75)",
              },
            }}
          >
            <h3 className="post__modal-heading">Remove post?</h3>
            <div className="post__modal-buttonWrapper">
              <button className="post__modal-button" onClick={deletePost}>
                YES
              </button>
              <button className="post__modal-button" onClick={closeModal}>
                NO
              </button>
            </div>
          </Modal>
        </Link>
      </div>
      <div className="post__image-container">
        <img src={postData.image} alt="Car" className="post__image" />
      </div>
      <div className="post__footer">
        <p className="post__description">{postData.description}</p>
        <div className="post__likes">
          <ThumbUpIcon
            style={{ fontSize: "32px" }}
            className="post__likes-icon"
            onClick={incrementLikes}
          />
          <span className="post__likesCount">{likesCount}</span>
        </div>
      </div>
    </div>
  );
}
