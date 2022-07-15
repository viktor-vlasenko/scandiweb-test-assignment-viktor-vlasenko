import { Component } from "react";

import classes from "./Attributes.module.css";

class Attributes extends Component {

  render() {
    return (
      <div className={classes.attributes}>
        {this.props.attributes.map((attr) => (
          <div key={attr.id}>
            <h4>{attr.name}:</h4>
            <div className={classes['text-attr-items']}>
              {attr.items.map((item) => (
                <div key={item.id} className={classes['text-attr-item']}>
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Attributes;
