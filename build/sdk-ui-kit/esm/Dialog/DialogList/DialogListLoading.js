// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { LoadingMask } from "../../LoadingMask/index.js";
export const DialogListLoading = ({ className }) => {
    return (React.createElement("div", { "aria-label": "dialog-list-loading", className: cx("gd-dialog-list-loading s-dialog-list-loading", className) },
        React.createElement(LoadingMask, { size: "large" })));
};
//# sourceMappingURL=DialogListLoading.js.map