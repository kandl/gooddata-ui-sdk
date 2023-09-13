// (C) 2020-2022 GoodData Corporation
import React, { useMemo } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC.js";
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
import { DashboardItemHeadlineContainer } from "./DashboardItemHeadlineContainer.js";
export const DashboardItemHeadline = ({ title, clientHeight }) => {
    // memoize the Truncate render as it is quite expensive
    const truncatedTitlePart = useMemo(() => {
        return (React.createElement(ResponsiveEllipsis, { maxLine: 2, ellipsis: "...", className: "item-headline-inner s-headline", text: title }));
    }, [title]);
    return (React.createElement(DashboardItemHeadlineContainer, { clientHeight: clientHeight }, truncatedTitlePart));
};
//# sourceMappingURL=DashboardItemHeadline.js.map