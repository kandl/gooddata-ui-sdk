import { LoadingComponent } from "@gooddata/sdk-ui";
import React from "react";
import { VALUE_CLASS } from "../base/constants.js";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
/**
 * Creates a loading renderer functional component which the table uses for rendering cells that will also show loading
 * indicators as data for them is being loaded.
 *
 * NOTE: keep in mind that this loading renderer IS NOT used to configure ag-grids built-in loading renderer. This
 * renderer is essentially a custom cell renderer which our table impl uses for all cells of the left-most table column.
 */
export function createLoadingRenderer(_table, _props) {
    return function LoadingRenderer(params) {
        var _a, _b, _c, _d, _e;
        const theme = useTheme();
        const color = (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.table) === null || _a === void 0 ? void 0 : _a.loadingIconColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c6) !== null && _e !== void 0 ? _e : undefined;
        if (params.node.rowPinned === "top") {
            return React.createElement("span", { className: "gd-sticky-header-value" }, params.formatValue(params.value));
        }
        // rows that are still loading do not have node.id
        // pinned rows (totals) do not have node.id as well, but we want to render them using the default renderer anyway
        if (params.node.id !== undefined || params.node.rowPinned === "bottom") {
            // params.value is always unformatted
            // there is params.formattedValue, but this is null for row attributes for some reason
            return (React.createElement("span", { className: `${VALUE_CLASS} s-loading-done` }, params.formatValue(params.value)));
        }
        return React.createElement(LoadingComponent, { color: color, width: 36, imageHeight: 8, height: 26, speed: 2 });
    };
}
//# sourceMappingURL=loadingRenderer.js.map