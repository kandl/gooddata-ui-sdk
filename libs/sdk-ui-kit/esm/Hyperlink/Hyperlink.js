// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import noop from "lodash/noop.js";
import isEmpty from "lodash/isEmpty.js";
/**
 * This component was implemented to follow current design of links
 * with minimal necessary stylization.
 *
 * @internal
 */
export const Hyperlink = (props) => {
    const { text, href, onClick = noop, className, iconClass } = props;
    return (React.createElement("a", { className: cx("gd-hyperlink", className), href: href, target: "_blank", rel: "noreferrer noopener", onClick: () => onClick() },
        !isEmpty(iconClass) && React.createElement("span", { className: cx("gd-hyperlink-icon", iconClass) }),
        !isEmpty(text) && React.createElement("span", { className: "gd-hyperlink-text" }, text)));
};
//# sourceMappingURL=Hyperlink.js.map