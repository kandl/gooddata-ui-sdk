import React from "react";
import DrillMeasureSelectorItem from "./DrillMeasureSelectorItem.js";
const DrillMeasureSelectorList = (props) => {
    return (React.createElement("div", { className: "gd-drill-measure-selector-list" }, props.supportedItems.map((item) => (React.createElement(DrillMeasureSelectorItem, { key: item.measure.measureHeaderItem.localIdentifier, item: item, onClick: props.onSelect, onCloseDropdown: props.onCloseDropdown })))));
};
export default DrillMeasureSelectorList;
//# sourceMappingURL=DrillMeasureSelectorList.js.map