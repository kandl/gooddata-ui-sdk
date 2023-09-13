import { __rest } from "tslib";
// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { DashboardItemBase } from "./DashboardItemBase.js";
export const DashboardItemKpi = (_a) => {
    var { visualizationClassName } = _a, props = __rest(_a, ["visualizationClassName"]);
    return React.createElement(DashboardItemBase, Object.assign({}, props, { visualizationClassName: cx("kpi", visualizationClassName) }));
};
//# sourceMappingURL=DashboardItemKpi.js.map