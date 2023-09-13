// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
/**
 * @internal
 */
export const Typography = (props) => {
    const { tagName: Tag, children, className, title, onClick } = props;
    return (React.createElement(Tag, { className: cx("gd-typography", `gd-typography--${Tag}`, className), onClick: onClick, title: title }, children));
};
//# sourceMappingURL=Typography.js.map