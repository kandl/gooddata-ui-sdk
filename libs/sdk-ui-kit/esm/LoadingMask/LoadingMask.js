// (C) 2007-2022 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
/**
 * @internal
 */
export const LoadingMask = (props) => {
    const { className, height, width, size } = props;
    const style = useMemo(() => ({
        width,
        height,
    }), [width, height]);
    const spinnerSize = size ? size : "large";
    return (React.createElement("div", { style: style, "aria-label": "loading", className: cx("s-isLoading", "loading-mask", className) },
        React.createElement("div", { className: cx("gd-spinner", spinnerSize) })));
};
//# sourceMappingURL=LoadingMask.js.map