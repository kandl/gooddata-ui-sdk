// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { ShortenedText } from "@gooddata/sdk-ui-kit";
import { stringUtils } from "@gooddata/util";
const tooltipAlignPoints = [{ align: "cl cr", offset: { x: -10, y: 0 } }];
export const MetricDropdownItem = ({ item, isSelected, unlistedTitle, unlistedIconTitle, isMobile, onClick, }) => {
    if (!item) {
        return null;
    }
    const unlistedIcon = (item === null || item === void 0 ? void 0 : item.unlisted) ? (React.createElement("span", { title: unlistedIconTitle, className: "gd-icon-16 gd-icon-unlisted" })) : (false);
    const effectiveTitle = (item === null || item === void 0 ? void 0 : item.unlisted) ? unlistedTitle : item.title;
    const metricItemClassNames = cx(`s-${stringUtils.simplifyText(effectiveTitle)}`, {
        "gd-list-item": true,
        "gd-list-item-shortened": true,
        "is-selected": isSelected,
    });
    const title = isMobile ? (effectiveTitle) : (React.createElement(ShortenedText, { tooltipAlignPoints: tooltipAlignPoints }, effectiveTitle));
    return (React.createElement("div", { key: item.id, className: metricItemClassNames, onClick: onClick },
        title,
        unlistedIcon));
};
//# sourceMappingURL=MetricDropdownItem.js.map