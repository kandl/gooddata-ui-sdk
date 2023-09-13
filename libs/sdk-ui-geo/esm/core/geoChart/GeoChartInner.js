// (C) 2020-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import throttle from "lodash/throttle.js";
import noop from "lodash/noop.js";
import { invariant } from "ts-invariant";
import ReactMeasure from "react-measure";
import { v4 } from "uuid";
import GeoChartRenderer from "./GeoChartRenderer.js";
import GeoChartLegendRenderer from "./GeoChartLegendRenderer.js";
import { getAvailableLegends } from "./helpers/geoChart/data.js";
import { IntlWrapper, IntlTranslationsProvider, convertDrillableItemsToPredicates, } from "@gooddata/sdk-ui";
import { getLegendDetails as getCommonVisLegendDetails, LegendPosition, shouldShowFluid, SupportedLegendPositions, } from "@gooddata/sdk-ui-vis-commons";
import { isColorAssignmentItemChanged, isFluidLegendEnabled } from "./helpers/geoChart/common.js";
import { getResponsiveInfo, isAutoPositionWithPopup } from "./helpers/geoChart/responsive.js";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(ReactMeasure);
function renderChart(props) {
    return React.createElement(GeoChartRenderer, { ...props });
}
function renderLegend(props) {
    return (React.createElement(IntlWrapper, { locale: props.locale },
        React.createElement(IntlTranslationsProvider, null, (translationProps) => (React.createElement(GeoChartLegendRenderer, { ...props, numericSymbols: translationProps.numericSymbols })))));
}
const DefaultGeoConfig = {
    mapboxToken: "",
};
/**
 * Geo Chart react component
 */
export class GeoChartInner extends React.PureComponent {
    static getDerivedStateFromProps(nextProps, prevState) {
        const { geoChartOptions } = nextProps;
        if (!geoChartOptions) {
            return null;
        }
        const { categoryItems, colorStrategy } = geoChartOptions;
        const colorAssignmentItem = colorStrategy.getColorAssignment();
        if (!isColorAssignmentItemChanged(prevState.colorAssignmentItem, colorAssignmentItem)) {
            return null;
        }
        return {
            enabledLegendItems: new Array(categoryItems.length).fill(true),
            colorAssignmentItem,
        };
    }
    throttledOnWindowResize;
    containerId = `geo-${v4()}`;
    constructor(props) {
        super(props);
        const { documentObj = document } = this.props;
        this.state = {
            enabledLegendItems: [],
            showFluidLegend: shouldShowFluid(documentObj),
            colorAssignmentItem: [],
        };
        this.throttledOnWindowResize = throttle(this.onWindowResize, 100);
    }
    componentDidMount() {
        this.updateConfigurationPanel(this.props.geoChartOptions);
        window.addEventListener("resize", this.throttledOnWindowResize);
    }
    componentDidUpdate() {
        this.updateConfigurationPanel(this.props.geoChartOptions);
    }
    componentWillUnmount() {
        this.throttledOnWindowResize.cancel();
        window.removeEventListener("resize", this.throttledOnWindowResize);
    }
    render() {
        const { height, config } = this.props;
        if (height !== undefined && !isAutoPositionWithPopup(config?.legend?.responsive)) {
            return this.renderVisualizationContent(undefined, height);
        }
        return (React.createElement(Measure, { client: true }, ({ measureRef, contentRect }) => {
            const { client: contentRectClient } = contentRect;
            return this.renderVisualizationContent(measureRef, contentRectClient?.height ?? 0, contentRect);
        }));
    }
    renderVisualizationContent(measureRef, height, contentRect) {
        const { geoChartOptions: geoChartOptionsProp } = this.props;
        const geoChartOptions = this.syncWithLegendItemStates(geoChartOptionsProp);
        const legendDetails = this.getLegendDetails(this.getLegendPosition(), contentRect);
        const position = legendDetails ? legendDetails.position : LegendPosition.TOP;
        const classes = this.getContainerClassName(position);
        const isLegendRenderedFirst = position === LegendPosition.TOP ||
            (position === LegendPosition.LEFT && !this.state.showFluidLegend);
        const legendComponent = this.renderLegend(height, position, geoChartOptions, contentRect);
        return (React.createElement("div", { className: classes, ref: measureRef },
            isLegendRenderedFirst ? legendComponent : null,
            this.renderChart(geoChartOptions),
            !isLegendRenderedFirst ? legendComponent : null));
    }
    syncWithLegendItemStates(geoChartOptions) {
        invariant(geoChartOptions, "illegal state - trying to sync legend with no geo options");
        const { categoryItems } = geoChartOptions;
        const { enabledLegendItems } = this.state;
        const withLegendItemStates = categoryItems.map((item, index) => ({
            ...item,
            isVisible: enabledLegendItems[index],
        }));
        return {
            ...geoChartOptions,
            categoryItems: withLegendItemStates,
        };
    }
    getContainerClassName(position) {
        const responsive = getResponsiveInfo(this.props?.config?.legend?.responsive) === true;
        const flexDirection = this.getFlexDirection(position);
        return cx("viz-line-family-chart-wrap", "gd-geo-component", "s-gd-geo-component", {
            "responsive-legend": responsive,
            "non-responsive-legend": !responsive,
            [`flex-direction-${flexDirection}`]: true,
            "legend-position-bottom": position === LegendPosition.BOTTOM,
        }, this.containerId);
    }
    getFlexDirection(position) {
        const isFluidLegend = this.isFluidLegend();
        if (position === LegendPosition.TOP || position === LegendPosition.BOTTOM || isFluidLegend) {
            return "column";
        }
        return "row";
    }
    isFluidLegend() {
        const { showFluidLegend } = this.state;
        const responsive = getResponsiveInfo(this.props?.config?.legend?.responsive);
        return isAutoPositionWithPopup(responsive)
            ? false
            : isFluidLegendEnabled(responsive, showFluidLegend);
    }
    onLegendItemClick = (item) => {
        const enabledLegendItems = this.state.enabledLegendItems.map((legendItem, index) => {
            if (index === item.legendIndex) {
                return !legendItem;
            }
            return legendItem;
        });
        this.setState({ enabledLegendItems });
    };
    getLegendPosition() {
        const position = this.props.config?.legend?.position ?? LegendPosition.TOP;
        const isSupportedLegend = SupportedLegendPositions.indexOf(position) > -1;
        return isSupportedLegend ? position : LegendPosition.TOP;
    }
    getLegendDetails(position, contentRect) {
        const { geoChartOptions: geoChartOptionsProp, config } = this.props;
        const geoChartOptions = this.syncWithLegendItemStates(geoChartOptionsProp);
        const { geoData } = geoChartOptions;
        const legendLabel = geoData?.segment?.name;
        const isFluidLegend = this.isFluidLegend();
        const legendDetailOptions = {
            showFluidLegend: isFluidLegend,
            contentRect,
            legendLabel,
        };
        return getCommonVisLegendDetails(position, getResponsiveInfo(config?.legend?.responsive), legendDetailOptions);
    }
    getLegendProps(height, position, geoChartOptions, contentRect) {
        const responsive = this.props.config?.legend?.responsive;
        const { locale } = this.props;
        const { enabledLegendItems } = this.state;
        const isFluidLegend = this.isFluidLegend();
        const { geoData, colorStrategy, categoryItems } = geoChartOptions;
        const { segment } = geoData;
        const colorFormat = geoData.color?.format;
        const sizeFormat = geoData.size?.format;
        const propsFromData = {
            format: colorFormat || sizeFormat,
            geoData,
        };
        const colorLegendValue = colorStrategy.getColorByIndex(0);
        const legendDetails = this.getLegendDetails(position, contentRect);
        let legendProps = {
            height,
            locale,
            position,
            responsive,
            isFluidLegend,
            onItemClick: this.onLegendItemClick,
            contentRect,
            containerId: this.containerId,
        };
        if (legendDetails) {
            legendProps = {
                ...legendProps,
                maxRows: legendDetails.maxRows,
                name: legendDetails.name,
                renderPopUp: legendDetails.renderPopUp,
            };
        }
        if (segment && enabledLegendItems.length) {
            return {
                ...legendProps,
                ...propsFromData,
                categoryItems,
                colorLegendValue,
            };
        }
        return {
            ...legendProps,
            ...propsFromData,
            colorLegendValue,
        };
    }
    getChartProps(geoChartOptions) {
        const { config = DefaultGeoConfig, dataView, drillableItems = [], afterRender = noop, onCenterPositionChanged = noop, onDrill = noop, onZoomChanged = noop, intl, onError, } = this.props;
        invariant(dataView, "invalid state - trying to render geo chart but there is no data to visualize");
        const { geoData, colorStrategy, categoryItems } = geoChartOptions;
        const segmentIndex = geoChartOptions.geoData.segment?.index;
        const drillablePredicates = convertDrillableItemsToPredicates(drillableItems);
        const drillConfig = { dataView, onDrill };
        const chartProps = {
            colorStrategy,
            config,
            dataView,
            drillableItems: drillablePredicates,
            drillConfig,
            afterRender,
            geoData,
            onCenterPositionChanged,
            onZoomChanged,
            intl,
            ...(onError ? { onError } : {}),
        };
        if (segmentIndex !== undefined) {
            const selectedSegmentItems = categoryItems
                .filter((item) => item.isVisible)
                .map((item) => item.uri);
            return {
                ...chartProps,
                config: { ...config, selectedSegmentItems },
            };
        }
        return chartProps;
    }
    renderChart = (geoChartOptions) => {
        const { chartRenderer = renderChart } = this.props;
        const chartProps = this.getChartProps(geoChartOptions);
        return chartRenderer(chartProps);
    };
    renderLegend = (height, position, geoChartOptions, contentRect) => {
        const enabled = this.props.config?.legend?.enabled ?? true;
        const { legendRenderer = renderLegend } = this.props;
        if (!enabled) {
            return null;
        }
        const legendProps = this.getLegendProps(height, position, geoChartOptions, contentRect);
        return legendRenderer(legendProps);
    };
    onWindowResize = () => {
        const { documentObj = document } = this.props;
        this.setState({
            showFluidLegend: shouldShowFluid(documentObj),
        });
    };
    updateConfigurationPanel(geoChartOptions) {
        invariant(geoChartOptions, "illegal state - updating config with no geo options");
        const { pushData } = this.props;
        const { categoryItems, geoData, colorStrategy, colorPalette } = geoChartOptions;
        const { hasCategoryLegend, hasColorLegend, hasSizeLegend } = getAvailableLegends(categoryItems, geoData);
        const isLegendVisible = hasCategoryLegend || hasColorLegend || hasSizeLegend;
        pushData?.({
            propertiesMeta: {
                // toggle legend section
                legend_enabled: isLegendVisible,
            },
            colors: {
                colorAssignments: colorStrategy.getColorAssignment(),
                colorPalette,
            },
        });
    }
}
//# sourceMappingURL=GeoChartInner.js.map