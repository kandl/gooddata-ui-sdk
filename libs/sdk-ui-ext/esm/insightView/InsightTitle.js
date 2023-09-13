// (C) 2021-2022 GoodData Corporation
import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC.js";
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
/**
 * @public
 */
const InsightTitle = ({ title }) => {
    return (React.createElement("div", { className: "insight-title-outer" },
        React.createElement("div", { className: "insight-title" },
            React.createElement(ResponsiveEllipsis, { text: title, maxLine: 2, ellipsis: "...", className: "item-headline-inner s-headline" }))));
};
export default InsightTitle;
//# sourceMappingURL=InsightTitle.js.map