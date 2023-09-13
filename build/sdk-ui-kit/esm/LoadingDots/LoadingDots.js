// (C) 2007-2020 GoodData Corporation
import React from "react";
import range from "lodash/range.js";
import cx from "classnames";
const DOT_COUNT = 3; // the same as $loading-dots-count in loadingDots.scsss
/**
 * @internal
 */
export const LoadingDots = ({ className }) => {
    return (React.createElement("div", { className: cx("gd-loading-dots", className) }, range(1, DOT_COUNT + 1).map((index) => (React.createElement("div", { key: index, className: `gd-loading-dots-${index}` })))));
};
//# sourceMappingURL=LoadingDots.js.map