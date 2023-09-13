// (C) 2021 GoodData Corporation
import React from "react";
export const HeadlinePaginationRenderer = ({ item, showPrevItem, showNextItem, }) => {
    const commonClassNames = "gd-button-link gd-button-icon-only pagination";
    return (React.createElement("div", { className: "headline-pagination" },
        React.createElement("button", { className: `${commonClassNames} first-item gd-icon-chevron-left`, onClick: showPrevItem, disabled: item === 1 }),
        React.createElement("button", { className: `${commonClassNames} second-item gd-icon-chevron-right`, onClick: showNextItem, disabled: item === 2 })));
};
//# sourceMappingURL=HeadlinePaginationRenderer.js.map