// (C) 2022 GoodData Corporation
import { factoryNotationFor, isColorMappingItem, insightProperties, } from "@gooddata/sdk-model";
import filter from "lodash/fp/filter.js";
import flow from "lodash/fp/flow.js";
import fromPairs from "lodash/fromPairs.js";
import toPairs from "lodash/toPairs.js";
import { insightConversion, } from "../../utils/embeddingCodeGenerator/index.js";
import { getChartSupportedControls } from "../../utils/propertiesHelper.js";
import { removeUseless } from "../../utils/removeUseless.js";
const supportedChartConfigProperties = new Set([
    "colorMapping",
    "colorPalette",
    "dataLabels",
    "dataPoints",
    "dualAxis",
    "enableChartSorting",
    "enableSeparateTotalLabels",
    "enableJoinedAttributeAxisName",
    "grid",
    "legend",
    "legendLayout",
    "limits",
    "primaryChartType",
    "secondary_xaxis",
    "secondary_yaxis",
    "secondaryChartType",
    "separators",
    "stackMeasures",
    "stackMeasuresToPercent",
    "xaxis",
    "xFormat",
    "xLabel",
    "yaxis",
    "yFormat",
    "yLabel",
    "total",
    "orientation",
    "comparison",
]);
export function chartConfigFromInsight(insight, ctx) {
    var _a, _b, _c, _d, _e, _f, _g;
    const properties = insightProperties(insight);
    const controls = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) !== null && _a !== void 0 ? _a : {};
    const includeColorPalette = (_c = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.backend) === null || _b === void 0 ? void 0 : _b.capabilities.supportsCustomColorPalettes) !== null && _c !== void 0 ? _c : false;
    const withValuesFromContext = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, controls), ((ctx === null || ctx === void 0 ? void 0 : ctx.colorPalette) && includeColorPalette ? { colorPalette: ctx.colorPalette } : {})), (((_d = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _d === void 0 ? void 0 : _d.separators) ? { separators: ctx.settings.separators } : {})), (((_e = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _e === void 0 ? void 0 : _e.enableChartsSorting) ? { enableChartSorting: true } : {})), (((_f = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _f === void 0 ? void 0 : _f.enableSeparateTotalLabels) ? { enableSeparateTotalLabels: true } : {})), (((_g = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _g === void 0 ? void 0 : _g.enableAxisNameViewByTwoAttributes) ? { enableJoinedAttributeAxisName: true } : {}));
    return flow(toPairs, filter(([key]) => supportedChartConfigProperties.has(key)), fromPairs, (c) => getChartSupportedControls(c, insight, ctx === null || ctx === void 0 ? void 0 : ctx.settings), removeUseless)(withValuesFromContext);
}
export function chartAdditionalFactories(options) {
    const { getColorMappingPredicatePackage = "@gooddata/sdk-ui-charts" } = options !== null && options !== void 0 ? options : {};
    return [
        {
            importInfo: {
                importType: "named",
                name: "getColorMappingPredicate",
                package: getColorMappingPredicatePackage,
            },
            transformation: (obj) => {
                return isColorMappingItem(obj)
                    ? `{predicate: getColorMappingPredicate("${obj.id}"), color: ${factoryNotationFor(obj.color)}}`
                    : undefined;
            },
        },
    ];
}
const chartConfigPropMeta = {
    typeImport: {
        importType: "named",
        name: "IChartConfig",
        package: "@gooddata/sdk-ui-charts",
    },
    cardinality: "scalar",
};
export function chartConfigInsightConversion(propName) {
    return insightConversion(propName, chartConfigPropMeta, chartConfigFromInsight);
}
//# sourceMappingURL=chartCodeGenUtils.js.map