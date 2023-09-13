// (C) 2022 GoodData Corporation
import cx from "classnames";
import React from "react";
/**
 * @internal
 */
export const ColorPreview = (props) => {
    return (React.createElement("div", { className: cx("gd-color-preview", props.className) }, props.colors.map((color, index) => (React.createElement("div", { key: index, className: "gd-color-preview-element", style: { backgroundColor: color } })))));
};
//# sourceMappingURL=ColorPreview.js.map