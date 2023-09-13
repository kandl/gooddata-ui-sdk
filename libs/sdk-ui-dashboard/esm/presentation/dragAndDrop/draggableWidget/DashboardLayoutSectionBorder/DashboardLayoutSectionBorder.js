// (C) 2019-2022 GoodData Corporation
import React from "react";
import { DashboardLayoutSectionBorderLine } from "./DashboardLayoutSectionBorderLine.js";
export const DashboardLayoutSectionBorder = (props) => (React.createElement(React.Fragment, null,
    React.createElement(DashboardLayoutSectionBorderLine, { position: "top", status: props.status }),
    props.children,
    React.createElement(DashboardLayoutSectionBorderLine, { position: "bottom", status: props.status })));
//# sourceMappingURL=DashboardLayoutSectionBorder.js.map