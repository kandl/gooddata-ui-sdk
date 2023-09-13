// (C) 2019-2022 GoodData Corporation
import React from "react";
import partition from "lodash/partition.js";
import { FormattedMessage } from "react-intl";
import { isDrillDownDefinition } from "../../../types.js";
import { DrillSelectListItem } from "./DrillSelectListItem.js";
export const DrillSelectList = (props) => {
    const { items } = props;
    const [drillDownItems, drillItems] = partition(items, (item) => {
        return isDrillDownDefinition(item.drillDefinition);
    });
    const renderItems = (items) => {
        return items.map((item) => (React.createElement(DrillSelectListItem, { key: item.id, item: item, onClick: props.onSelect })));
    };
    const renderDrillDownItems = (items) => {
        if ((items === null || items === void 0 ? void 0 : items.length) > 0) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "gd-drill-modal-picker-title" },
                    React.createElement(FormattedMessage, { id: "drill_modal_picker.drill-down", tagName: "span" })),
                renderItems(items)));
        }
    };
    const renderDrillItems = (items) => {
        if ((items === null || items === void 0 ? void 0 : items.length) > 0) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "gd-drill-modal-picker-title" },
                    React.createElement(FormattedMessage, { id: "drill_modal_picker.drill-into", tagName: "span" })),
                renderItems(items)));
        }
    };
    return (React.createElement("div", { className: "gd-drill-modal-picker-selector-list" },
        renderDrillDownItems(drillDownItems),
        renderDrillItems(drillItems)));
};
//# sourceMappingURL=DrillSelectList.js.map