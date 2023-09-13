// (C) 2007-2023 GoodData Corporation
import React from "react";
import ReactMeasure from "react-measure";
import cx from "classnames";
import { defaultImport } from "default-import";
import isEmpty from "lodash/isEmpty.js";
import { FluidLegend } from "./FluidLegend.js";
import { StaticLegend } from "./StaticLegend.js";
import { HeatmapLegend } from "./HeatmapLegend.js";
import { IntlWrapper, IntlTranslationsProvider } from "@gooddata/sdk-ui";
import { PopUpLegend } from "./PopUpLegend/PopUpLegend.js";
import { TOP, BOTTOM } from "./PositionTypes.js";
const HEATMAP_LEGEND_WIDTH_BREAKPOINT = 460;
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(ReactMeasure);
/**
 * @internal
 */
class Legend extends React.PureComponent {
    static defaultProps = {
        responsive: false,
        legendItemsEnabled: [],
        height: 0,
        showFluidLegend: false,
        isLegendOverHeight: false,
        enableBorderRadius: false,
    };
    onItemClick = (item) => {
        this.props.onItemClick(item);
    };
    getSeries = () => {
        const { series, legendItemsEnabled = [], seriesMapper } = this.props;
        const seriesWithVisibility = series.map((seriesItem) => {
            const isVisible = legendItemsEnabled[seriesItem.legendIndex];
            return {
                ...seriesItem,
                isVisible,
            };
        });
        if (seriesMapper) {
            return seriesMapper(seriesWithVisibility);
        }
        return seriesWithVisibility;
    };
    renderPopUpLegend = () => {
        const { legendLabel, maximumRows, enableBorderRadius, containerId = "" } = this.props;
        return (React.createElement(PopUpLegend, { containerId: containerId, series: this.getSeries(), maxRows: maximumRows, name: legendLabel, enableBorderRadius: enableBorderRadius, onLegendItemClick: this.onItemClick }));
    };
    renderFluid = () => {
        const { enableBorderRadius } = this.props;
        return (React.createElement(Measure, { client: true, "aria-label": "Fluid legend" }, ({ measureRef, contentRect }) => {
            const usedWidth = contentRect.client?.width ? Math.floor(contentRect.client.width) : 0;
            return (React.createElement("div", { className: "viz-fluid-legend-wrap", ref: measureRef },
                React.createElement(FluidLegend, { series: this.getSeries(), enableBorderRadius: enableBorderRadius, onItemClick: this.onItemClick, containerWidth: usedWidth })));
        }));
    };
    renderStatic = () => {
        const { position, height, enableBorderRadius, responsive, legendLabel: label } = this.props;
        const classNames = cx("viz-static-legend-wrap", `position-${position}`);
        const buttonOrientation = responsive === "autoPositionWithPopup" ? "leftRight" : "upDown";
        const props = {
            containerHeight: 0,
            series: this.getSeries(),
            onItemClick: this.onItemClick,
            position,
            enableBorderRadius,
            buttonOrientation,
            label,
        };
        return (React.createElement(Measure, { client: true }, ({ measureRef, contentRect }) => {
            const measuredHeight = contentRect.client?.height
                ? Math.floor(contentRect.client.height)
                : 0;
            const usedHeight = height || measuredHeight;
            if (!isEmpty(contentRect.client)) {
                this.props.validateOverHeight(contentRect.client);
            }
            return (React.createElement("div", { className: classNames, ref: measureRef },
                React.createElement(StaticLegend, { ...props, containerHeight: usedHeight })));
        }));
    };
    render() {
        const { contentDimensions, responsive, heatmapLegend, showFluidLegend, maximumRows } = this.props;
        if (heatmapLegend) {
            return this.renderHeatmapLegend(contentDimensions);
        }
        if (responsive === "autoPositionWithPopup" && maximumRows) {
            return this.renderPopUpLegend();
        }
        const isFluidLegend = responsive === true && showFluidLegend;
        if (isFluidLegend) {
            return this.renderFluid();
        }
        return this.renderStatic();
    }
    renderHeatmapLegend = (contentDimensions) => {
        const { locale, format, responsive, position, legendLabel } = this.props;
        const { showFluidLegend } = this.props;
        const series = this.getSeries();
        const isFluidResponsive = Boolean(responsive === true && showFluidLegend);
        const isPopupResponsive = (position === TOP || position === BOTTOM) &&
            responsive === "autoPositionWithPopup" &&
            contentDimensions.width &&
            contentDimensions.width < HEATMAP_LEGEND_WIDTH_BREAKPOINT;
        let size = "large";
        if (isFluidResponsive) {
            size = "medium";
        }
        if (isPopupResponsive) {
            size = "small";
        }
        return (React.createElement(IntlWrapper, { locale: locale },
            React.createElement(IntlTranslationsProvider, null, (props) => (React.createElement(HeatmapLegend, { title: legendLabel, series: series, format: format, size: size, numericSymbols: props.numericSymbols, position: position })))));
    };
}
export { Legend };
//# sourceMappingURL=Legend.js.map