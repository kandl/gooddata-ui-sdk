// (C) 2020-2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
function getbuttonIcoStyle(type, buttonsOrientation) {
    if (type === "prev") {
        if (buttonsOrientation === "upDown") {
            return "up";
        }
        return "left";
    }
    if (type === "next") {
        if (buttonsOrientation === "upDown") {
            return "down";
        }
        return "right";
    }
    return undefined;
}
function renderPagingButton(type, buttonsOrientation, handler, disabled) {
    const classes = cx("gd-button-link", "gd-button-icon-only", `gd-icon-chevron-${getbuttonIcoStyle(type, buttonsOrientation)}`, "paging-button");
    const onClick = () => {
        handler();
    };
    return React.createElement("button", { className: classes, onClick: onClick, disabled: disabled });
}
/**
 * @internal
 */
export const Paging = (props) => {
    const { page, pagesCount, buttonsOrientation = "upDown", showNextPage, showPrevPage } = props;
    return (React.createElement("div", { className: "paging", "aria-label": "Paging" },
        renderPagingButton("prev", buttonsOrientation, showPrevPage, page === 1),
        React.createElement(FormattedMessage, { id: "visualizations.of", tagName: "span", values: {
                page: React.createElement("strong", null, page),
                pagesCount,
            } }),
        renderPagingButton("next", buttonsOrientation, showNextPage, page === pagesCount)));
};
//# sourceMappingURL=Paging.js.map