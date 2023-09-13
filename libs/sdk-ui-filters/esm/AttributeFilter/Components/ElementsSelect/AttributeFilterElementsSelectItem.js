// (C) 2007-2022 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
import camelCase from "lodash/camelCase.js";
import { FormattedMessage, useIntl } from "react-intl";
import { getElementTitle } from "../../utils.js";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
const ALIGN_POINTS = [{ align: "bl tc", offset: { x: 7, y: 0 } }];
/**
 * This component represents the Attribute Filter element.
 * It displays a checkbox to add/remove to/from selection.
 * It allows users to add only this item to selection.
 * It also displays a localized empty element label in case element value is empty.
 *
 * @beta
 */
export const AttributeFilterElementsSelectItem = (props) => {
    const { item, isSelected, onSelect, onSelectOnly, onDeselect } = props;
    const intl = useIntl();
    const onItemClick = useCallback(() => {
        if (isSelected) {
            onDeselect();
        }
        else {
            onSelect();
        }
    }, [onSelect, onDeselect, isSelected]);
    const onOnlyItemClick = useCallback((event) => {
        event.stopPropagation();
        onSelectOnly();
    }, [onSelectOnly]);
    const classes = cx("gd-attribute-filter-elements-select-item__next", "gd-list-item", "has-only-visible", "s-attribute-filter-list-item", `s-attribute-filter-list-item-${camelCase(item.title)}`, { "is-selected": isSelected }, {
        "s-attribute-filter-list-item-selected": isSelected,
    }, {
        "gd-attribute-filter-list-empty-item": !item.title,
    });
    const labelClasses = cx("input-checkbox-label", {
        "gd-empty-value-label": !item.title,
    });
    const itemTitle = getElementTitle(item, intl);
    return (React.createElement("div", { className: classes, onClick: onItemClick, title: itemTitle },
        React.createElement("label", { className: labelClasses },
            React.createElement("input", { type: "checkbox", className: "input-checkbox", readOnly: true, checked: isSelected }),
            React.createElement("span", { className: "input-label-text" }, itemTitle)),
        !item.title && (React.createElement("div", { className: "gd-empty-list-item-tooltip-wrapper" },
            React.createElement(BubbleHoverTrigger, { className: "gd-empty-list-item-tooltip", showDelay: 0, hideDelay: 0 },
                React.createElement("span", { className: "gd-icon-circle-question gd-empty-value-tooltip-icon" }),
                React.createElement(Bubble, { className: "bubble-primary gd-empty-item-bubble", alignTo: ".gd-empty-value-tooltip-icon", alignPoints: ALIGN_POINTS },
                    React.createElement(FormattedMessage, { id: "attributesDropdown.empty.item.tooltip" }))))),
        React.createElement("span", { className: "gd-list-item-only", onClick: onOnlyItemClick },
            React.createElement(FormattedMessage, { id: "gs.list.only" }))));
};
//# sourceMappingURL=AttributeFilterElementsSelectItem.js.map