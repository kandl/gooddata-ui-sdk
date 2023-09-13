// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import DrillMeasureSelectorList from "./DrillMeasureSelectorList.js";
import DrillAttributeSelectorList from "./DrillAttributeSelectorList.js";
const DrillOriginSelectorBody = (props) => {
    const { onCloseDropdown, onSelect, supportedItems } = props;
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    return (React.createElement("div", { className: "gd-drill-item-selector-dropdown s-drill-item-selector-dropdown", onScroll: stopPropagation },
        React.createElement("div", { className: "gd-drill-item-selector-header" },
            React.createElement(FormattedMessage, { id: "configurationPanel.drillConfig.clickHint" }),
            React.createElement("button", { className: "gd-button-link gd-button-icon-only gd-icon-cross", onClick: onCloseDropdown })),
        React.createElement("div", { className: "gd-drill-item-selector-body" },
            React.createElement(DrillMeasureSelectorBody, { supportedItems: supportedItems, onSelect: onSelect, onCloseDropdown: onCloseDropdown }),
            React.createElement(DrillAttributeSelectorBody, { supportedItems: supportedItems, onSelect: onSelect, onCloseDropdown: onCloseDropdown }))));
};
const DrillMeasureSelectorBody = (props) => {
    var _a;
    const { supportedItems, onSelect, onCloseDropdown } = props;
    return ((_a = supportedItems.measures) === null || _a === void 0 ? void 0 : _a.length) ? (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "gd-drill-origin-selector-separator" },
            React.createElement("span", null,
                React.createElement(FormattedMessage, { id: "configurationPanel.drillConfig.measureValue" }))),
        React.createElement(DrillMeasureSelectorList, { supportedItems: supportedItems.measures, onSelect: onSelect, onCloseDropdown: onCloseDropdown }))) : null;
};
const DrillAttributeSelectorBody = (props) => {
    var _a;
    const { supportedItems, onSelect, onCloseDropdown } = props;
    return ((_a = supportedItems.attributes) === null || _a === void 0 ? void 0 : _a.length) ? (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "gd-drill-origin-selector-separator" },
            React.createElement("span", null,
                React.createElement(FormattedMessage, { id: "configurationPanel.drillConfig.attributeValue" }))),
        React.createElement(DrillAttributeSelectorList, { supportedItems: supportedItems.attributes, onSelect: onSelect, onCloseDropdown: onCloseDropdown }))) : null;
};
export default DrillOriginSelectorBody;
//# sourceMappingURL=DrillOriginSelectorBody.js.map