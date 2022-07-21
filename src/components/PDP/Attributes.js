import { Component } from "react";

import classes from "./Attributes.module.css";

class Attributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
    };
  }

  componentDidMount() {
    this.setDefaultAttributes();
  }

  setDefaultAttributes() {
    const attributes = this.props.attributes;
    console.log(attributes);
    if (attributes.length === 0) {
      return;
    }
    let defaultAttributes = [];
    attributes.forEach((attr) => {
      const attributeId = attr.id;
      defaultAttributes.push({
        attributeId,
        attributeItemId: attr.items[0].id,
      });
    });
    this.setState({ selectedAttributes: defaultAttributes });
  }

  setAttributeHandler(attrId, itemId) {
    console.log(`Changing ${attrId} to ${itemId}`);
    let currentSelectedAttributes = [...this.state.selectedAttributes];
    currentSelectedAttributes.find(
      (attr) => attr.attributeId === attrId
    ).attributeItemId = itemId;
    this.setState({ selectedAttributes: currentSelectedAttributes });
    console.log(`Changed ${attrId} to ${itemId}!`);
  }

  attributeValueIsSelected(attrId, itemId) {
    console.log("Selecting value of " + attrId + " and " + itemId);
    const foundValue = this.state.selectedAttributes.find(
      (selectedAttribute) =>
        selectedAttribute.attributeId === attrId &&
        selectedAttribute.attributeItemId === itemId
    );
    console.log(foundValue);
    return foundValue;
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
            <h4>{attr.name}:</h4>
            <div className={classes["text-attr-items"]}>
              {attr.items.map((item) => (
                <div
                  key={item.id}
                  onClick={this.setAttributeHandler.bind(
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

export default Attributes;
