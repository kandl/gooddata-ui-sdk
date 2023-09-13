// (C) 2007-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
export const CoreHeaderWorkspacePickerItem = ({ intl, title, isLoading, isSelected, isDemo, onClick, }) => {
    const t = intl.formatMessage;
    if (isLoading) {
        return (React.createElement("div", { className: "gd-list-item gd-project-list-item gd-is-loading" },
            React.createElement("div", { className: "gd-spinner small" })));
    }
    const classes = cx({
        "gd-list-item": true,
        "gd-project-list-item": true,
        [`s-${stringUtils.simplifyText(title)}`]: true,
        "gd-is-selected": isSelected,
        "gd-is-demo": isDemo,
    });
    return (React.createElement("div", { className: classes, title: title, onClick: onClick },
        React.createElement("span", { className: "project-title" }, title),
        isDemo ? (React.createElement("span", { className: "demo-sticker" }, t({ id: "gs.header.projectPicker.demo" }))) : null));
};
export const HeaderWorkspacePickerItem = injectIntl(CoreHeaderWorkspacePickerItem);
//# sourceMappingURL=HeaderWorkspacePickerItem.js.map