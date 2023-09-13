// (C) 2020 GoodData Corporation
import React, { memo } from "react";
const SMALLEST_WIDGET_HEIGHT = 120;
const SMALL_WIDGET_HEIGHT = 140;
const SMALL_HEIGHT = 38;
const SMALL_LINE_HEIGHT = 36;
const INNER_STYLE_SMALL = { fontSize: "15px" };
const CUSTOM_MARGIN_STYLE = { marginTop: 0 };
const CUSTOM_OUTER_STYLE = {
    height: `${SMALL_HEIGHT}px`,
    lineHeight: `${SMALL_LINE_HEIGHT}px`,
};
const CUSTOM_OUTER_STYLE_WITH_CUSTOM_MARGIN = Object.assign(Object.assign({}, CUSTOM_OUTER_STYLE), { CUSTOM_MARGIN_STYLE });
function isSmallCustomHeight(clientHeight) {
    return clientHeight !== undefined ? clientHeight < SMALLEST_WIDGET_HEIGHT : false;
}
// compose the styles "statically" so that the result's referential equality is retained where possible
function getOuterStyle(hasCustomMargin, isCustomHeightSmall) {
    if (isCustomHeightSmall) {
        return hasCustomMargin ? CUSTOM_OUTER_STYLE_WITH_CUSTOM_MARGIN : CUSTOM_OUTER_STYLE;
    }
    if (hasCustomMargin) {
        return CUSTOM_MARGIN_STYLE;
    }
}
// inner utility component for better caching: caches according to two booleans, not a clientHeight number
const DashboardItemHeadlineContainerInner = memo(function DashboardItemHeadlineContainerInner({ hasCustomMargin, isCustomHeightSmall, children }) {
    return (React.createElement("div", { className: "item-headline-outer", style: getOuterStyle(hasCustomMargin, isCustomHeightSmall) },
        React.createElement("div", { className: "item-headline", style: isCustomHeightSmall ? INNER_STYLE_SMALL : undefined }, children)));
});
export const DashboardItemHeadlineContainer = ({ children, clientHeight, }) => {
    return (React.createElement(DashboardItemHeadlineContainerInner, { hasCustomMargin: clientHeight !== undefined ? clientHeight <= SMALL_WIDGET_HEIGHT : false, isCustomHeightSmall: isSmallCustomHeight(clientHeight) }, children));
};
//# sourceMappingURL=DashboardItemHeadlineContainer.js.map