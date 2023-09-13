// (C) 2021-2022 GoodData Corporation
import React from "react";
import { TitleWrapper } from "./TitleWrapper.js";
/**
 * @alpha
 */
export const DefaultTitle = (props) => {
    const { title } = props;
    return (React.createElement(TitleWrapper, null,
        React.createElement("div", { className: "s-gd-dashboard-title s-dash-title dash-title static" }, title)));
};
//# sourceMappingURL=DefaultTitle.js.map