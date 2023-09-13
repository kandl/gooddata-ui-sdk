import { getCalculationValuesDefault, getComparisonFormat, } from "@gooddata/sdk-ui-charts";
import { comparisonMessages } from "../../locales.js";
const NUMBER_FORMAT_PRESET_INHERIT = "inherit";
export function getComparisonDefaultValues(defaultCalculationType, properties) {
    var _a, _b;
    const calculationType = ((_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.calculationType) || defaultCalculationType;
    return getCalculationValuesDefault(calculationType);
}
export function getNumberFormat(properties, defaultFormat) {
    var _a, _b;
    return getComparisonFormat((_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.format, defaultFormat);
}
export function isComparisonDefaultColors(colorConfig) {
    return !(colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.positive) && !(colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.negative) && !(colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.equals);
}
export const getPresets = (intl) => [
    {
        name: intl.formatMessage(comparisonMessages.formatPresetInherit),
        localIdentifier: NUMBER_FORMAT_PRESET_INHERIT,
        format: null,
        previewNumber: 1000.12,
    },
    {
        name: intl.formatMessage(comparisonMessages.formatPresetRounded),
        localIdentifier: "rounded",
        format: "#,##0",
        previewNumber: 1000.12,
    },
    {
        name: intl.formatMessage(comparisonMessages.formatPresetDecimal1),
        localIdentifier: "decimal-1",
        format: "#,##0.0",
        previewNumber: 1000.12,
    },
    {
        name: intl.formatMessage(comparisonMessages.formatPresetDecimal2),
        localIdentifier: "decimal-2",
        format: "#,##0.00",
        previewNumber: 1000.12,
    },
    {
        name: intl.formatMessage(comparisonMessages.formatPresetPercentRounded),
        localIdentifier: "percent-rounded",
        format: "#,##0%",
        previewNumber: 0.1,
    },
    {
        name: intl.formatMessage(comparisonMessages.formatPresetPercent1),
        localIdentifier: "percent-1",
        format: "#,##0.0%",
        previewNumber: 0.101,
    },
    {
        name: intl.formatMessage(comparisonMessages.formatPresetPercent2),
        localIdentifier: "percent-2",
        format: "#,##0.00%",
        previewNumber: 0.1012,
    },
];
/**
 * @internal
 */
export const getTemplates = (intl) => [
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateRounded),
        localIdentifier: "rounded",
        format: "#,##0",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateDecimal1),
        localIdentifier: "decimal-1",
        format: "#,##0.0",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateDecimal2),
        localIdentifier: "decimal-2",
        format: "#,##0.00",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplatePercentRounded),
        localIdentifier: "percent-rounded",
        format: "#,##0%",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplatePercent1),
        localIdentifier: "percent-1",
        format: "#,##0.0%",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplatePercent2),
        localIdentifier: "percent-2",
        format: "#,##0.00%",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateCurrency),
        localIdentifier: "currency",
        format: "$#,##0.00",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateCurrencyShortened),
        localIdentifier: "currency-shortened",
        format: "[>=1000000000000]$#,,,,.0 T;\n" +
            "[>=1000000000]$#,,,.0 B;\n" +
            "[>=1000000]$#,,.0 M;\n" +
            "[>=1000]$#,.0 K;\n" +
            "[>=0]$#,##0;\n" +
            "[<=-1000000000000]-$#,,,,.0 T;\n" +
            "[<=-1000000000]-$#,,,.0 B;\n" +
            "[<=-1000000]-$#,,.0 M;\n" +
            "[<=-1000]-$#,.0 K;\n" +
            "[<0]-$#,##0",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateLargeNumbersShortened),
        localIdentifier: "large-numbers-shortened",
        format: "[>=1000000000000]#,,,,.0 T;\n" +
            "[>=1000000000]#,,,.0 B;\n" +
            "[>=1000000]#,,.0 M;\n" +
            "[>=1000]#,.0 K;\n" +
            "[>=0]#,##0;\n" +
            "[<=-1000000000000]-#,,,,.0 T;\n" +
            "[<=-1000000000]-#,,,.0 B;\n" +
            "[<=-1000000]-#,,.0 M;\n" +
            "[<=-1000]-#,.0 K;\n" +
            "[<0]-#,##0",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateLargeNumbersShortenedWithColors),
        localIdentifier: "large-numbers-shortened-with-colors",
        format: "[>=1000000000000][green]#,,,,.0 T;\n" +
            "[>=1000000000][green]#,,,.0 B;\n" +
            "[>=1000000][green]#,,.0 M;\n" +
            "[>=1000][black]#,.0 K;\n" +
            "[>=0][black]#,##0;\n" +
            "[<=-1000000000000][red]-#,,,,.0 T;\n" +
            "[<=-1000000000][red]-#,,,.0 B;\n" +
            "[<=-1000000][red]-#,,.0 M;\n" +
            "[<=-1000][red]-#,.0 K;\n" +
            "[<0][black]-#,##0",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateNegativeNumbersRed),
        localIdentifier: "negative-numbers-red",
        format: "[<0][red]-#,##0.0;\n" + "[black]#,##0.0",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateFinancial),
        localIdentifier: "financial",
        format: "[<0](#,##0.0);\n" + "#,##0.0",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateDecimalWithoutThousandsSeparator),
        localIdentifier: "decimal-without-thousands-separator",
        format: "0.00",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateConditionalColors),
        localIdentifier: "conditional-colors",
        format: "[<0][red]#,#.##;\n" + "[<1000][black]#,0.##;\n" + "[>=1000][green]#,#.##",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateTrendSymbols),
        localIdentifier: "trend-symbols",
        format: "[<0][green]▲ #,##0.0%;\n" + "[=0][black]#,##0.0%;\n" + "[>0][red]▼ #,##0.0%",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateTimeFromSeconds),
        localIdentifier: "time-from-seconds",
        format: "[>=86400]{{{86400||0d}}} {{{3600|24|00}}}h;\n" +
            "[>=3600]{{{3600|24|00}}}h {{{60|60|00}}}m;\n" +
            "[>=60]{{{60|60|00}}}m {{{|60.|00}}}s;\n" +
            "[>0]{{{|60.|00.0}}}s;\n" +
            "[=0]{{{|60.|0}}}",
    },
    {
        name: intl.formatMessage(comparisonMessages.formatTemplateZeroInsteadOfNull),
        localIdentifier: "zero-instead-of-null",
        format: "[=null]0.00;\n" + "[>=0]#,#0.00;\n" + "[<0]-#,#0.00",
    },
];
//# sourceMappingURL=comparisonHelper.js.map