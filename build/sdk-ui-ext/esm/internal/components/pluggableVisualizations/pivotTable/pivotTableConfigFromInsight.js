// (C) 2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { insightProperties } from "@gooddata/sdk-model";
import { createPivotTableConfig } from "./PluggablePivotTable.js";
import { getColumnWidthsFromProperties } from "../../../utils/propertiesHelper.js";
export function pivotTableConfigFromInsight(insight, ctx) {
    var _a, _b, _c, _d, _e, _f;
    const baseConfig = (ctx === null || ctx === void 0 ? void 0 : ctx.settings) && ctx.backend
        ? createPivotTableConfig({ separators: (_a = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _a === void 0 ? void 0 : _a.separators }, "none", ctx.settings, ctx.backend.capabilities, (_b = getColumnWidthsFromProperties(insightProperties(insight))) !== null && _b !== void 0 ? _b : [])
        : {};
    const columnSizingProp = !isEmpty(baseConfig.columnSizing)
        ? { columnSizing: baseConfig.columnSizing }
        : {};
    const menuProp = !isEmpty(baseConfig.menu) ? { menu: baseConfig.menu } : {};
    const separatorsProp = !isEmpty(baseConfig.separators) ? { separators: baseConfig.separators } : {};
    const measureGroupDimension = (_d = (_c = insightProperties(insight)) === null || _c === void 0 ? void 0 : _c.controls) === null || _d === void 0 ? void 0 : _d.measureGroupDimension;
    const metricsPositionProp = !isEmpty(measureGroupDimension) ? { measureGroupDimension } : {};
    const columnHeadersPosition = (_f = (_e = insightProperties(insight)) === null || _e === void 0 ? void 0 : _e.controls) === null || _f === void 0 ? void 0 : _f.columnHeadersPosition;
    const columnHeadersPositionProp = !isEmpty(columnHeadersPosition) ? { columnHeadersPosition } : {};
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, columnSizingProp), menuProp), separatorsProp), metricsPositionProp), columnHeadersPositionProp);
}
//# sourceMappingURL=pivotTableConfigFromInsight.js.map