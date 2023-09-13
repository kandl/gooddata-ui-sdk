// (C) 2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
/**
 * @internal
 */
export const AttributeDatasetInfo = ({ title, defaultAttributeFilterTitle, attributeDataSet, }) => {
    return (React.createElement("div", { className: "gd-attribute-filter-tooltip-content s-attribute-filter-tooltip-content" },
        React.createElement("h3", { className: "s-attribute-filter-tooltip-header" }, title !== null && title !== void 0 ? title : defaultAttributeFilterTitle),
        React.createElement("h4", null,
            React.createElement(FormattedMessage, { id: "attributesDropdown.details.type" })),
        React.createElement("p", { className: "s-attribute-filter-tooltip-item-name" }, defaultAttributeFilterTitle),
        React.createElement("h4", null,
            React.createElement(FormattedMessage, { id: "attributesDropdown.details.dataset" })),
        React.createElement("p", { className: "s-attribute-filter-tooltip-item-dataset" }, attributeDataSet.title)));
};
//# sourceMappingURL=AttributeDatasetInfo.js.map