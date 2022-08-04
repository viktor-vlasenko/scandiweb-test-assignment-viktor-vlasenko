import { Component } from "react";
import { withRouter } from "react-router";

import productPageClasses from "./Attributes.module.css";
import miniCartClasses from "../Cart/MiniCart/MiniCartItemAttributes.module.css";

class Attributes extends Component {
  // Changes attribute value
  changeAttributeHandler(attrId, itemId) {
    this.props.onAttributeChange({ attrId, itemId });
  }

  // Helping method to determine whether attribute value is selected or not
  attributeValueIsSelected(attrId, itemId) {
    const foundValue = this.props.selectedAttributes.find(
      (selectedAttribute) =>
        selectedAttribute.attributeId === attrId &&
        selectedAttribute.attributeItemId === itemId
    );
    return foundValue ? true : false;
  }

  render() {
    /**
     * Determines which styles to use for component based on place;
     * place is received as props
     */
    const classes =
      this.props.place === "miniCart" ? miniCartClasses : productPageClasses;

    // Helping function to style selected attributes
    const attributeClassesSetter = (attr, itemId) => {
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
    };

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
                  className={attributeClassesSetter(attr, item.id)}
                >
                  {attr.type === "text" && <p>{item.value}</p>}
                  {attr.type === "swatch" && item.value !== "#FFFFFF" && (
                    <div style={{ backgroundColor: item.value }} />
                  )}
                  {attr.type === "swatch" && item.value === "#FFFFFF" && (
                    <div
                      style={{
                        backgroundColor: item.value,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(29, 31, 34, 0.5)",
                      }}
                    />
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
