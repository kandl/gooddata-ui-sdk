// (C) 2007-2022 GoodData Corporation
import React from "react";
import { getValidColorPalette, ChartTransformation } from "../../highcharts/index.js";
import noop from "lodash/noop.js";
import { defaultCoreChartProps } from "../_commons/defaultProps.js";
import { newErrorMapping, ErrorCodes, IntlWrapper, IntlTranslationsProvider, withEntireDataView, } from "@gooddata/sdk-ui";
import { getSanitizedStackingConfig } from "../_commons/sanitizeStacking.js";
import { ThemeContextProvider } from "@gooddata/sdk-ui-theme-provider";
class StatelessBaseChart extends React.Component {
    constructor(props) {
        super(props);
        this.errorMap = newErrorMapping(props.intl);
    }
    render() {
        const { dataView, error, isLoading } = this.props;
        const ErrorComponent = this.props.ErrorComponent;
        const LoadingComponent = this.props.LoadingComponent;
        if (error) {
            const errorProps = this.errorMap[Object.prototype.hasOwnProperty.call(this.errorMap, error)
                ? error
                : ErrorCodes.UNKNOWN_ERROR];
            return ErrorComponent ? React.createElement(ErrorComponent, Object.assign({ code: error }, errorProps)) : null;
        }
        // when in pageble mode (getPage present) never show loading (its handled by the component)
        if (isLoading || !dataView) {
            return LoadingComponent ? React.createElement(LoadingComponent, null) : null;
        }
        return this.renderChartTransformation();
    }
    renderChartTransformation() {
        const { afterRender, height, width, locale, config, type, dataView, onDataTooLarge, pushData, theme, drillableItems, onDrill, onNegativeValues, onLegendReady, } = this.props;
        const colorPalette = getValidColorPalette(config);
        const fullConfig = Object.assign(Object.assign({}, config), { type, colorPalette });
        const sanitizedConfig = getSanitizedStackingConfig(dataView.definition, fullConfig);
        return (React.createElement(ThemeContextProvider, { theme: theme, themeIsLoading: false },
            React.createElement(IntlWrapper, { locale: locale },
                React.createElement(IntlTranslationsProvider, null, (translationProps) => {
                    return (React.createElement(ChartTransformation, { height: height, width: width, config: sanitizedConfig, drillableItems: drillableItems, locale: locale, dataView: dataView, afterRender: afterRender, onDrill: onDrill, onDataTooLarge: onDataTooLarge, onNegativeValues: onNegativeValues, onLegendReady: onLegendReady, pushData: pushData, numericSymbols: translationProps.numericSymbols }));
                }))));
    }
}
StatelessBaseChart.defaultProps = Object.assign(Object.assign({}, defaultCoreChartProps), { onDataTooLarge: noop, onLegendReady: noop, config: {} });
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disappear.
 *
 * @internal
 */
export const BaseChart = withEntireDataView(StatelessBaseChart);
//# sourceMappingURL=BaseChart.js.map