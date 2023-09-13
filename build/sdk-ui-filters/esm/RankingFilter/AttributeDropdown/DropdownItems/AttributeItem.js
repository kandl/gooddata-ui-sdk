// (C) 2020 GoodData Corporation
import React from "react";
import { stringUtils } from "@gooddata/util";
import cx from "classnames";
import { Button, Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
export const AttributeItem = ({ item, iconClass, isSelected, onSelect, onDropDownItemMouseOver, onDropDownItemMouseOut, customGranularitySelection, }) => {
    const { title, ref } = item;
    const isDisabled = customGranularitySelection && !customGranularitySelection.enable;
    const className = cx("gd-list-item", "gd-list-item-shortened", {
        "is-selected": isSelected,
        "is-disabled": isDisabled,
    }, "gd-button-link", iconClass, `s-rf-attribute-${stringUtils.simplifyText(title)}`);
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
    if (!isDisabled) {
        return (React.createElement("button", { className: className, onClick: () => onSelect(ref), onMouseOver: onMouseOver, onMouseOut: onMouseOut, title: title },
            React.createElement("span", null, title)));
    }
    return (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
        React.createElement(Button, { className: className, value: title, title: title, disabled: true }),
        React.createElement(Bubble, { className: "bubble-primary gd-rf-tooltip-bubble s-rf-disabled-attribute-bubble", alignPoints: [{ align: "cr cl" }, { align: "cl cr" }] }, customGranularitySelection.warningMessage)));
};
//# sourceMappingURL=AttributeItem.js.map