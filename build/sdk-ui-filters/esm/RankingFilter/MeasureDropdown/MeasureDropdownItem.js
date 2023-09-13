// (C) 2020-2022 GoodData Corporation
import React from "react";
import { stringUtils } from "@gooddata/util";
import cx from "classnames";
export const MeasureDropdownItem = ({ item, isSelected, onSelect, onDropDownItemMouseOver, onDropDownItemMouseOut, enableRenamingMeasureToMetric, }) => {
    const { title, ref, sequenceNumber } = item;
    const className = cx("gd-list-item", "gd-list-item-shortened", {
        "is-selected": isSelected,
    }, "gd-button-link", enableRenamingMeasureToMetric ? "gd-icon-metric" : "gd-icon-measure", `s-rf-measure-${stringUtils.simplifyText(title)}`);
    const onMouseOver = () => {
        if (onDropDownItemMouseOver) {
            onDropDownItemMouseOver(ref);
        }
    };
    const onMouseOut = () => {
        if (onDropDownItemMouseOut) {
            onDropDownItemMouseOut();
        }
    };
    return (React.createElement("button", { className: className, onClick: () => onSelect(ref), onMouseOver: onMouseOver, onMouseOut: onMouseOut, title: title },
        React.createElement("span", { className: "gd-rf-measure-title" }, title),
        sequenceNumber ? React.createElement("span", { className: "gd-rf-sequence-number" }, sequenceNumber) : null));
};
//# sourceMappingURL=MeasureDropdownItem.js.map