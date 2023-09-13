// (C) 2020-2022 GoodData Corporation
import React, { forwardRef } from "react";
import cx from "classnames";
export const DashboardItemContent = forwardRef(function DashboardItemContent({ children, className, isSelectable, isSelected, onSelected }, ref) {
    return (React.createElement("div", { className: cx("dash-item-content", className, {
            "is-selectable": isSelectable,
            "is-selected": isSelected,
        }), ref: ref, onClick: onSelected }, children));
});
//# sourceMappingURL=DashboardItemContent.js.map