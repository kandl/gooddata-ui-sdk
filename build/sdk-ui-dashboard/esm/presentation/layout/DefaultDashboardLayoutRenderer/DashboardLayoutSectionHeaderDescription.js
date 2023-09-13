// (C) 2019-2020 GoodData Corporation
import * as React from "react";
import cx from "classnames";
export const DashboardLayoutSectionHeaderDescription = (props) => {
    const { description } = props;
    const className = cx("gd-paragraph", "description", "s-fluid-layout-row-description");
    return React.createElement("div", { className: className }, description);
};
//# sourceMappingURL=DashboardLayoutSectionHeaderDescription.js.map