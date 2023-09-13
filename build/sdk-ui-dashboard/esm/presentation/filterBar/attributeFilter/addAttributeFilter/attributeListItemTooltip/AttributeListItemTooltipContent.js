// (C) 2023 GoodData Corporation
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
function AttrTooltipElements(props) {
    const intl = useIntl();
    const { elements, totalCount } = props;
    const remainingElementsCount = totalCount - elements.length;
    return (React.createElement(React.Fragment, null,
        elements.map((element, idx) => (React.createElement("span", { key: idx, className: "gd-attribute-element s-attribute-element" },
            element.title || `(${intl.formatMessage({ id: "empty_value" })})`,
            React.createElement("br", null)))),
        remainingElementsCount > 0 && (React.createElement("span", { key: elements.length, className: "attribute-tooltip-elements-more" },
            React.createElement(FormattedMessage, { id: "attributesDropdown.details.shortening_decoration", values: { count: remainingElementsCount } })))));
}
/**
 * @internal
 */
export const AttributeListItemTooltipContent = ({ item, attributesDataSetLoading, attributesElementsLoading, attributeDataSet, attributeElements, }) => {
    return (React.createElement("div", { className: "gd-attribute-dropdown-list-tooltip-content s-attribute-dropdown-item-list-tooltip-content" },
        React.createElement("h3", { className: "s-attribute-filter-tooltip-header" }, item.attribute.title),
        React.createElement("h4", null,
            React.createElement(FormattedMessage, { id: "attributesDropdown.details.dataset" })),
        React.createElement("p", { className: "s-attribute-filter-tooltip-item-dataset" }, attributesDataSetLoading ? React.createElement(FormattedMessage, { id: "loading" }) : attributeDataSet === null || attributeDataSet === void 0 ? void 0 : attributeDataSet.title),
        React.createElement("h4", null,
            React.createElement(FormattedMessage, { id: "attributesDropdown.details.values" })),
        React.createElement("p", { className: "s-attribute-filter-tooltip-item-elements" }, attributesElementsLoading ? (React.createElement(FormattedMessage, { id: "loading" })) : (React.createElement(AttrTooltipElements, { elements: attributeElements.elements, totalCount: attributeElements.totalCount })))));
};
//# sourceMappingURL=AttributeListItemTooltipContent.js.map