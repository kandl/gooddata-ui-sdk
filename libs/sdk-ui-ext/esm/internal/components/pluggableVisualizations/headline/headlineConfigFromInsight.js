// (C) 2023 GoodData Corporation
import { insightProperties } from "@gooddata/sdk-model";
import { DEFAULT_COMPARISON_PALETTE } from "@gooddata/sdk-ui-charts";
import { HEADLINE_DEFAULT_CONTROL_PROPERTIES } from "../../../constants/supportedProperties.js";
export function headlineConfigFromInsight(insight, ctx) {
    var _a, _b, _c, _d, _e;
    if ((_a = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _a === void 0 ? void 0 : _a.enableNewHeadline) {
        const separatorsProp = ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _b === void 0 ? void 0 : _b.separators) ? { separators: (_c = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _c === void 0 ? void 0 : _c.separators } : {};
        const comparison = ((_e = (_d = insightProperties(insight)) === null || _d === void 0 ? void 0 : _d.controls) === null || _e === void 0 ? void 0 : _e.comparison) ||
            HEADLINE_DEFAULT_CONTROL_PROPERTIES.comparison;
        return Object.assign({ comparison, colorPalette: DEFAULT_COMPARISON_PALETTE }, separatorsProp);
    }
    return null;
}
//# sourceMappingURL=headlineConfigFromInsight.js.map