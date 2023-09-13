import cx from "classnames";
import isNil from "lodash/isNil.js";
import React, { useMemo } from "react";
import { Col } from "react-grid-system";
const isHiddenStyle = { height: 0, width: 0, overflow: "hidden", flex: 0 };
export const DashboardLayoutItemViewRenderer = (props) => {
    var _a, _b, _c, _d, _e;
    const { item, screen, children, className, minHeight = 0, isHidden } = props;
    const { size, ratio, width, height } = getSizeForItem(item, screen);
    const style = useMemo(() => {
        let computedStyle = {
            minHeight,
        };
        if (isHidden) {
            computedStyle = Object.assign(Object.assign({}, computedStyle), isHiddenStyle);
        }
        return computedStyle;
    }, [minHeight, isHidden]);
    return (React.createElement(Col, { xl: (_a = size === null || size === void 0 ? void 0 : size.xl) === null || _a === void 0 ? void 0 : _a.gridWidth, lg: (_b = size === null || size === void 0 ? void 0 : size.lg) === null || _b === void 0 ? void 0 : _b.gridWidth, md: (_c = size === null || size === void 0 ? void 0 : size.md) === null || _c === void 0 ? void 0 : _c.gridWidth, sm: (_d = size === null || size === void 0 ? void 0 : size.sm) === null || _d === void 0 ? void 0 : _d.gridWidth, xs: (_e = size === null || size === void 0 ? void 0 : size.xs) === null || _e === void 0 ? void 0 : _e.gridWidth, className: cx("gd-fluidlayout-column", "s-fluid-layout-column", `s-fluid-layout-screen-${screen}`, `s-fluid-layout-column-width-${width}`, {
            [`s-fluid-layout-column-ratio-${ratio}`]: !isNil(ratio),
            [`s-fluid-layout-column-height-${height}`]: !isNil(height),
        }, className), style: style }, children));
};
function getSizeForItem(item, screen) {
    const size = item.size();
    const currentScreenSizeConfiguration = item.sizeForScreen(screen);
    const ratio = currentScreenSizeConfiguration === null || currentScreenSizeConfiguration === void 0 ? void 0 : currentScreenSizeConfiguration.heightAsRatio;
    const height = currentScreenSizeConfiguration === null || currentScreenSizeConfiguration === void 0 ? void 0 : currentScreenSizeConfiguration.gridHeight;
    const width = currentScreenSizeConfiguration === null || currentScreenSizeConfiguration === void 0 ? void 0 : currentScreenSizeConfiguration.gridWidth;
    return {
        height,
        width,
        ratio,
        size,
    };
}
//# sourceMappingURL=DashboardLayoutItemViewRenderer.js.map