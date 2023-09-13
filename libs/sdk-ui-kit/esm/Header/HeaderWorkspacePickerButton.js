// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
export const HeaderWorkspacePickerButton = ({ title, onClick, isOpen, }) => {
    const classNames = cx({
        "gd-header-project": true,
        [`s-${stringUtils.simplifyText(title)}`]: true,
        "is-expanded": isOpen,
        "is-collapsed": !isOpen,
    });
    return (React.createElement("div", { className: classNames, onClick: onClick }, title));
};
//# sourceMappingURL=HeaderWorkspacePickerButton.js.map