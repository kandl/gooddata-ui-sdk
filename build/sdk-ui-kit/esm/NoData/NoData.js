// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
/**
 * @internal
 */
export const NoData = ({ className, hasNoMatchingData, notFoundLabel, noDataLabel, }) => {
    const classNames = cx("gd-no-data", {
        "gd-no-matching-data": hasNoMatchingData,
        "gd-no-data-available": !hasNoMatchingData,
    }, className);
    return React.createElement("div", { className: classNames }, hasNoMatchingData ? notFoundLabel : noDataLabel);
};
//# sourceMappingURL=NoData.js.map