// (C) 2020-2022 GoodData Corporation
import React from "react";
import { DashboardItemContent } from "./DashboardItemContent.js";
import { DashboardItemContentWrapper } from "./DashboardItemContentWrapper.js";
const noopRender = () => null;
export const DashboardItemBase = ({ children, contentClassName, visualizationClassName, renderHeadline = noopRender, renderBeforeVisualization = noopRender, renderAfterVisualization = noopRender, renderBeforeContent = noopRender, renderAfterContent = noopRender, contentRef, isSelectable = false, isSelected = false, onSelected, }) => {
    return (React.createElement(DashboardItemContentWrapper, null, ({ clientWidth, clientHeight }) => (React.createElement(React.Fragment, null,
        renderBeforeContent(),
        React.createElement(DashboardItemContent, { className: contentClassName, ref: contentRef, isSelectable: isSelectable, isSelected: isSelected, onSelected: onSelected },
            renderBeforeVisualization(),
            React.createElement("div", { className: visualizationClassName },
                renderHeadline(clientHeight),
                children({ clientWidth, clientHeight })),
            renderAfterVisualization()),
        renderAfterContent()))));
};
//# sourceMappingURL=DashboardItemBase.js.map