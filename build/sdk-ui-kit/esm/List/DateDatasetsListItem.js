// (C) 2007-2020 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { ShortenedText } from "../ShortenedText/index.js";
/**
 * @internal
 */
export const DateDatasetsListItem = ({ id, title, isHeader, isSelected, isUnrelated, onClick, }) => {
    if (isHeader) {
        return (React.createElement("div", { className: "gd-list-item gd-list-item-header" },
            React.createElement(FormattedMessage, { id: title })));
    }
    const classNames = cx("gd-list-item", "gd-list-item-shortened", `s-${id}`, `s-${stringUtils.simplifyText(title)}`, {
        "is-selected": isSelected,
        "is-unrelated": isUnrelated,
    });
    const tooltipAlignPoints = [
        { align: "cl cr", offset: { x: -10, y: 0 } },
        { align: "cr cl", offset: { x: 10, y: 0 } },
    ];
    return (React.createElement("div", { className: classNames, onClick: onClick },
        React.createElement(ShortenedText, { tooltipAlignPoints: tooltipAlignPoints }, title)));
};
//# sourceMappingURL=DateDatasetsListItem.js.map