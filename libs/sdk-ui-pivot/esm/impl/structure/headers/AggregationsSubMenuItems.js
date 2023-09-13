// (C) 2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { attributeDescriptorLocalId, attributeDescriptorName, } from "@gooddata/sdk-model";
import { Header, Item } from "@gooddata/sdk-ui-kit";
import menuHelper from "./aggregationsMenuHelper.js";
const getPreviousAttributeName = (rowAttributeDescriptors, attributeHeaderIndex) => {
    return attributeDescriptorName(rowAttributeDescriptors[attributeHeaderIndex - 1]);
};
const getAttributeName = (intl, rowAttributeDescriptors, afmAttributeHeaderIndex, isColumn) => {
    if (afmAttributeHeaderIndex === 0) {
        if (!isColumn) {
            return intl.formatMessage({ id: "visualizations.menu.aggregations.all-columns" });
        }
        else {
            return intl.formatMessage({ id: "visualizations.menu.aggregations.all-rows" });
        }
    }
    const attributeName = getPreviousAttributeName(rowAttributeDescriptors, afmAttributeHeaderIndex);
    return intl.formatMessage({ id: "visualizations.menu.aggregations.within-attribute" }, { attributeName });
};
const getSubtotalNameTestClass = (attributeLocalIdentifier) => {
    const attributeClass = attributeLocalIdentifier.replace(/\./g, "-");
    return `s-aggregation-item-${attributeClass}`;
};
export const AggregationsSubMenuItems = ({ attributeDescriptors, measureLocalIdentifiers, intl, totalType, totals, isColumn, icon, headerText, onAggregationSelect, }) => {
    const attributeItems = attributeDescriptors.map((_attributeDescriptor, headerIndex) => {
        const attributeLocalIdentifier = attributeDescriptorLocalId(attributeDescriptors[headerIndex]);
        const isSelected = menuHelper.isTotalEnabledForSubMenuAttribute(attributeLocalIdentifier, totalType, totals);
        const onClick = () => onAggregationSelect({
            type: totalType,
            measureIdentifiers: measureLocalIdentifiers,
            include: !isSelected,
            attributeIdentifier: attributeLocalIdentifier,
            isColumn,
        });
        const attributeName = getAttributeName(intl, attributeDescriptors, headerIndex, isColumn);
        return (React.createElement(Item, { checked: isSelected, key: attributeLocalIdentifier },
            React.createElement("div", { onClick: onClick, className: cx("gd-aggregation-menu-item-inner", "s-menu-aggregation-inner", getSubtotalNameTestClass(attributeLocalIdentifier), {
                    "s-menu-aggregation-inner-selected": isSelected,
                    "s-menu-aggregation-inner-column": !isColumn,
                    "s-menu-aggregation-inner-row": isColumn,
                }) }, attributeName)));
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, null,
            icon,
            React.createElement("span", null, headerText)),
        attributeItems));
};
//# sourceMappingURL=AggregationsSubMenuItems.js.map