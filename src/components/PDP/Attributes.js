import { Component } from "react";
import { withRouter } from "react-router";

import classes from "./Attributes.module.css";

class Attributes extends Component {
  changeAttributeHandler(attrId, itemId) {
    this.props.onAttributeChange({ attrId, itemId });
  }

  attributeValueIsSelected(attrId, itemId) {
    const foundValue = this.props.selectedAttributes.find(
      (selectedAttribute) =>
        selectedAttribute.attributeId === attrId &&
        selectedAttribute.attributeItemId === itemId
    );
    return foundValue ? true : false;
  }

  attributeClassesSetter(attr, itemId) {
    if (attr.type === "text") {
      return this.attributeValueIsSelected(attr.id, itemId)
        ? classes["text-attr-item"] +
            " " +
            classes["selected-text-attribute-item"]
        : classes["text-attr-item"];
    }
    if (attr.type === "swatch") {
      return this.attributeValueIsSelected(attr.id, itemId)
        ? classes["swatch-attr-item"] +
            " " +
            classes["selected-swatch-attr-item"]
        : classes["swatch-attr-item"];
    }
  }

  render() {
    return (
      <div className={classes.attributes}>
        {this.props.attributes.map((attr) => (
          <div key={attr.id}>
            <h4 className={classes["attr-name"]}>{attr.name}:</h4>
            <div className={classes["text-attr-items"]}>
              {attr.items.map((item) => (
                <div
                  key={item.id}
                  onClick={this.changeAttributeHandler.bind(
                    this,
                    attr.id,
                    item.id
                  )}
                  className={this.attributeClassesSetter(attr, item.id)}
                >
                  {attr.type === "text" && <p>{item.value}</p>}
                  {attr.type === "swatch" && (
                    <div style={{ backgroundColor: item.value }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(Attributes);
