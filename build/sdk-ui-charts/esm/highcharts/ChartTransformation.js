import { invariant } from "ts-invariant";
import React, { useEffect } from "react";
import { convertDrillableItemsToPredicates, emptyHeaderTitleFromIntl, totalColumnTitleFromIntl, } from "@gooddata/sdk-ui";
import { getChartOptions } from "./chartTypes/_chartOptions/chartOptionsBuilder.js";
import { getHighchartsOptions } from "./chartTypes/_chartCreators/highChartsCreators.js";
import { HighChartsRenderer, renderChart as chartRenderer, renderLegend as legendRenderer, } from "./adapter/HighChartsRenderer.js";
import { HighChartsMeasuredRenderer } from "./adapter/HighChartsMeasuredRenderer.js";
import buildLegendOptions from "./adapter/legendBuilder.js";
import noop from "lodash/noop.js";
import isEqual from "lodash/isEqual.js";
import isFunction from "lodash/isFunction.js";
import omitBy from "lodash/omitBy.js";
import { injectIntl } from "react-intl";
import { getDataTooLargeErrorMessage, validateData } from "./chartTypes/_chartOptions/chartLimits.js";
import { withTheme } from "@gooddata/sdk-ui-theme-provider";
import Highcharts from "./lib/index.js";
import { isChartSupported, stringifyChartTypes } from "./chartTypes/_util/common.js";
export function renderHighCharts(props) {
    const childrenRenderer = (contentRect) => (React.createElement(HighChartsRenderer, Object.assign({ contentRect: contentRect }, props)));
    return React.createElement(HighChartsMeasuredRenderer, { childrenRenderer: childrenRenderer });
}
const ChartTransformationImpl = (props) => {
    const { config, renderer = renderHighCharts, dataView, height, width, afterRender = noop, onDrill = () => true, onLegendReady = noop, locale, intl, theme, numericSymbols, drillableItems = [], onDataTooLarge, onNegativeValues = null, pushData = noop, } = props;
    const visType = config.type;
    const drillablePredicates = convertDrillableItemsToPredicates(drillableItems);
    const chartOptions = getChartOptions(dataView, config, drillablePredicates, emptyHeaderTitleFromIntl(intl), theme, totalColumnTitleFromIntl(intl));
    const legendOptions = buildLegendOptions(config.legend, chartOptions, intl);
    const validationResult = validateData(config.limits, chartOptions);
    const drillConfig = { dataView, onDrill };
    const hcOptions = getHighchartsOptions(chartOptions, drillConfig, config, dataView.definition, intl, theme);
    const rendererProps = {
        chartOptions,
        hcOptions,
        height,
        width,
        afterRender,
        onLegendReady,
        locale,
        legend: legendOptions,
        theme,
    };
    if (validationResult.dataTooLarge) {
        // always force onDataTooLarge error handling
        invariant(onDataTooLarge, "Visualization's onDataTooLarge callback is missing.");
        onDataTooLarge(chartOptions, getDataTooLargeErrorMessage(config.limits, chartOptions));
    }
    else if (validationResult.hasNegativeValue) {
        // ignore hasNegativeValue if validation already fails on dataTooLarge
        // force onNegativeValues error handling only for pie chart.
        // hasNegativeValue can be true only for pie chart.
        invariant(onNegativeValues, '"onNegativeValues" callback required for pie chart transformation is missing.');
        onNegativeValues(chartOptions);
    }
    useEffect(() => {
        pushData({
            propertiesMeta: {
                legend_enabled: legendOptions.toggleEnabled,
            },
            colors: {
                colorAssignments: chartOptions.colorAssignments,
                colorPalette: chartOptions.colorPalette,
            },
        });
    });
    if (!isChartSupported(visType)) {
        invariant(false, `Unknown visualization type: ${visType}. Supported visualization types: ${stringifyChartTypes()}`);
    }
    if (numericSymbols === null || numericSymbols === void 0 ? void 0 : numericSymbols.length) {
        Highcharts.setOptions({
            lang: {
                numericSymbols,
            },
        });
    }
    if (validationResult.dataTooLarge || validationResult.hasNegativeValue) {
        return null;
    }
    const resetZoomButtonTooltip = intl
        ? intl.formatMessage({ id: "visualization.tooltip.resetZoom" })
        : null;
    return renderer(Object.assign(Object.assign({}, rendererProps), { chartRenderer, legendRenderer, resetZoomButtonTooltip }));
};
/**
 * @internal
 */
const ChartTransformationWithInjectedProps = injectIntl(withTheme(ChartTransformationImpl));
export const ChartTransformation = React.memo(ChartTransformationWithInjectedProps, (props, nextProps) => {
    return isEqual(omitBy(props, isFunction), omitBy(nextProps, isFunction));
});
//# sourceMappingURL=ChartTransformation.js.map