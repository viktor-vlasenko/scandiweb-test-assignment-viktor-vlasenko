import { Component } from "react";

import classes from "./CartItemGallery.module.css";
import arrow from "../../../assets/arrow-white.svg";

class CartItemGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedImageNumber: 0,
    };
  }

  changeImageHandler(value) {
    let newImageNumber = this.state.displayedImageNumber + value;
    if (newImageNumber >= this.props.gallery.length) {
      newImageNumber = 0;
    } else if (newImageNumber < 0) {
      newImageNumber = this.props.gallery.length - 1;
    }
    this.setState({ displayedImageNumber: newImageNumber });
  }

  render() {
    const gallery = this.props.gallery;

    return (
      <div className={classes.gallery}>
        <img
          src={gallery[this.state.displayedImageNumber]}
          alt={this.props.name}
        />
        {gallery.length > 1 && (
          <div className={classes.controls}>
            <button onClick={this.changeImageHandler.bind(this, -1)}>
              <img src={arrow} alt="arrow left" />
            </button>
            <button
              className={classes.right}
              onClick={this.changeImageHandler.bind(this, 1)}
            >
              <img src={arrow} alt="arrow right" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CartItemGallery;
