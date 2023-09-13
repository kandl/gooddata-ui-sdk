import { DefaultLocale, resolveLocale } from "@gooddata/sdk-ui";
import { chartConfigFromInsight } from "../../components/pluggableVisualizations/chartCodeGenUtils.js";
import { geoConfigForInsightViewComponent, isGeoChart, } from "../../components/pluggableVisualizations/geoChart/geoConfigCodeGenerator.js";
/**
 * @internal
 */
export function configForInsightView(insight) {
    if (isGeoChart(insight)) {
        return geoConfigForInsightViewComponent();
    }
    return {
        value: chartConfigFromInsight(insight),
        meta: {
            typeImport: {
                importType: "named",
                name: "IChartConfig",
                package: "@gooddata/sdk-ui-charts",
            },
            cardinality: "scalar",
        },
    };
}
export function localeForInsightView(ctx) {
    var _a;
    const val = resolveLocale((_a = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _a === void 0 ? void 0 : _a.locale);
    return {
        value: val !== DefaultLocale ? val : undefined,
        meta: {
            cardinality: "scalar",
        },
    };
}
//# sourceMappingURL=insightViewConfig.js.map