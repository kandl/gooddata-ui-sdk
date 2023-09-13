// (C) 2021-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
export const HeightResizer = (props) => {
    const { status } = props;
    const boxClassName = cx("s-gd-fluidlayout-height-resizer", "gd-fluidlayout-height-resizer", status);
    const lineClassName = cx("height-resizer-line", status);
    return (React.createElement("div", { className: boxClassName },
        React.createElement("div", { className: lineClassName })));
};
//# sourceMappingURL=HeightResizer.js.map