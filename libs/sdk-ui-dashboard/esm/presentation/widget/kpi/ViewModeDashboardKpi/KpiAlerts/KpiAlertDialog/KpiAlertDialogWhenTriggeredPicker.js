// (C) 2021-2022 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
import { Dropdown, DropdownButton, DropdownList, ShortenedText } from "@gooddata/sdk-ui-kit";
import { stringUtils } from "@gooddata/util";
export const KpiAlertDialogWhenTriggeredPicker = ({ intl, onWhenTriggeredChange, whenTriggered, }) => {
    const alertTypeItems = useMemo(() => [
        { title: intl.formatMessage({ id: "kpiAlertDialog.threshold.above" }), id: "aboveThreshold" },
        { title: intl.formatMessage({ id: "kpiAlertDialog.threshold.below" }), id: "underThreshold" },
    ], [intl]);
    const selectedItem = alertTypeItems.find((item) => item.id === whenTriggered);
    return (React.createElement(Dropdown, { className: "alert-select s-alert_select", renderButton: ({ toggleDropdown }) => (React.createElement(DropdownButton, { className: "dropdown-button", value: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.title, onClick: toggleDropdown })), renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { className: "s-alert-list", width: 256, items: alertTypeItems, itemsCount: alertTypeItems.length, renderItem: ({ item }) => (React.createElement("div", { className: cx("gd-list-item", "gd-list-item-shortened", `s-${stringUtils.simplifyText(item.title)}`), onClick: (e) => {
                    e.preventDefault();
                    onWhenTriggeredChange(item.id);
                    closeDropdown();
                } },
                React.createElement(ShortenedText, null, item.title))) })) }));
};
//# sourceMappingURL=KpiAlertDialogWhenTriggeredPicker.js.map