import React from "react";
const DrillMeasureSelectorItem = (props) => {
    const onClick = () => {
        props.onClick(props.item);
        props.onCloseDropdown();
    };
    const name = props.item.measure.measureHeaderItem.name;
    return (React.createElement("a", { onClick: onClick, className: `gd-drill-measure-selector-list-item s-drill-measure-selector-item`, title: name }, name));
};
export default DrillMeasureSelectorItem;
//# sourceMappingURL=DrillMeasureSelectorItem.js.map