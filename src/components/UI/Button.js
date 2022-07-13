import { Component } from "react";

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} value={this.props.value}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
