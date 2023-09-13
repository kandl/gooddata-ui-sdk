// (C) 2022 GoodData Corporation
import isEmpty from "lodash/isEmpty";
import { insightProperties } from "@gooddata/sdk-model";
import { createPivotTableConfig } from "./PluggablePivotTable";
import { getColumnWidthsFromProperties } from "../../../utils/propertiesHelper";
export function pivotTableConfigFromInsight(insight, ctx) {
    var _a, _b;
    const baseConfig = (ctx === null || ctx === void 0 ? void 0 : ctx.settings) && ctx.backend
        ? createPivotTableConfig({ separators: (_a = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _a === void 0 ? void 0 : _a.separators }, "none", ctx.settings, ctx.backend.capabilities, (_b = getColumnWidthsFromProperties(insightProperties(insight))) !== null && _b !== void 0 ? _b : [])
        : {};
    const columnSizingProp = !isEmpty(baseConfig.columnSizing)
        ? { columnSizing: baseConfig.columnSizing }
        : {};
    const menuProp = !isEmpty(baseConfig.menu) ? { menu: baseConfig.menu } : {};
    const separatorsProp = !isEmpty(baseConfig.separators) ? { separators: baseConfig.separators } : {};
    return Object.assign(Object.assign(Object.assign({}, columnSizingProp), menuProp), separatorsProp);
}
//# sourceMappingURL=pivotTableConfigFromInsight.js.map