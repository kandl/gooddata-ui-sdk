import React from "react";
import { DrillAttributeSelectorItem } from "./DrillAttributeSelectorItem.js";
const DrillAttributeSelectorList = (props) => {
    return (React.createElement("div", { className: "gd-drill-attribute-selector-list" }, props.supportedItems.map((item) => (React.createElement(DrillAttributeSelectorItem, { key: item.attribute.attributeHeader.localIdentifier, item: item, onClick: props.onSelect, onCloseDropdown: props.onCloseDropdown })))));
};
export default DrillAttributeSelectorList;
//# sourceMappingURL=DrillAttributeSelectorList.js.map