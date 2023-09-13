// (C) 2022 GoodData Corporation
import React from "react";
import { useDashboardSelector, selectRenderMode } from "../../model/index.js";
/**
 * Returns a component that wraps components for different render modes and automatically chooses the correct one.
 * If component for current render mode is not defined, component for "view" mode is used.
 *
 * @param components - the components to choose from
 * @internal
 */
export function renderModeAware(components) {
    return function RenderModeAware(props) {
        var _a;
        const renderMode = useDashboardSelector(selectRenderMode);
        const Component = (_a = components[renderMode]) !== null && _a !== void 0 ? _a : components["view"];
        return React.createElement(Component, Object.assign({}, props));
    };
}
//# sourceMappingURL=renderModeAware.js.map