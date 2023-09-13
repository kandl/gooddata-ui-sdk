// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
export function WidthResizer({ status }) {
    const boxClassName = cx("s-gd-fluidlayout-width-resizer", "gd-fluidlayout-width-resizer", status);
    const lineClassName = cx("width-resizer-line", status);
    return (React.createElement("div", { className: boxClassName },
        React.createElement("div", { className: lineClassName })));
}
//# sourceMappingURL=WidthResizer.js.map