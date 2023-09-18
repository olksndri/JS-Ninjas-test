import ImageGallery from "react-image-gallery";
import React from "react";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { DeleteBtn } from "./DeleteBtn";
import { updateHeroById } from "../js/async";
import css from "../styles/ImageGallery.module.css";

export class MyGallery extends React.Component {
  constructor() {
    super();
    this.imageGalleryRef = React.createRef();
    this.state = {
      currentIndex: 0,
    };
  }

  handleSlide = (currentIndex) => {
    this.setState({ currentIndex });
  };

  currentImageDeleteHandler = () => {
    const currentIndex = this.state.currentIndex;
    const images = this.props.images;
    const id = this.props.id;
    const setIsLoading = this.props.setIsLoading;
    const currentImage = images[currentIndex];

    const indexForDelete = images.findIndex((img) => img === currentImage);

    images.splice(indexForDelete, 1);

    updateHeroById(id, { images })
      .then(() => {
        Notify.success(`Image deleted!`, { timeout: 4000 });
        setIsLoading(true);
      })
      .catch((e) => {
        Report.failure(
          `Error ${e.response.status}`,
          `${e.response.data.message}`,
          "Okay"
        );
      });
  };

  render() {
    const images = this.props.images;

    const newImages = images.map((el) => {
      return {
        original: el,
      };
    });

    return (
      <>
        <ImageGallery
          ref={this.imageGalleryRef}
          items={newImages}
          showFullscreenButton={false}
          showPlayButton={false}
          onSlide={this.handleSlide}
        />
        {images.length > 0 && (
          <div className={css["btn_wrap"]}>
            <p>Delete current image</p>
            <DeleteBtn deleteHandler={this.currentImageDeleteHandler} />
          </div>
        )}
      </>
    );
  }
}
