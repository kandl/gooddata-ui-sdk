// (C) 2020-2022 GoodData Corporation
import React from "react";
import { invariant } from "ts-invariant";
import { getGeoAttributeHeaderItems, isDataOfReasonableSize } from "./helpers/geoChart/common.js";
import { getGeoData } from "./helpers/geoChart/data.js";
import { GeoChartInner } from "./GeoChartInner.js";
import { DEFAULT_DATA_POINTS_LIMIT } from "./constants/geoChart.js";
import { DataViewFacade, ErrorCodes, newErrorMapping, ErrorComponent as DefaultErrorComponent, LoadingComponent as DefaultLoadingComponent, } from "@gooddata/sdk-ui";
import { isResultAttributeHeader } from "@gooddata/sdk-model";
import { getValidColorPalette, } from "@gooddata/sdk-ui-vis-commons";
import { getColorStrategy } from "./colorStrategy/geoChart.js";
export class GeoChartOptionsWrapper extends React.Component {
    emptyHeaderString;
    nullHeaderString;
    errorMap;
    constructor(props) {
        super(props);
        this.emptyHeaderString = props.intl.formatMessage({ id: "visualization.emptyValue" });
        this.nullHeaderString = props.intl.formatMessage({ id: "visualization.emptyValue" }); // TODO: RAIL-4360 replace by proper null header string id when available
        this.errorMap = newErrorMapping(props.intl);
    }
    render() {
        const { dataView, error, isLoading } = this.props;
        // if explicitly null, do not default the components to allow them to be disabled
        const ErrorComponent = this.props.ErrorComponent === null ? null : this.props.ErrorComponent ?? DefaultErrorComponent;
        const LoadingComponent = this.props.LoadingComponent === null
            ? null
            : this.props.LoadingComponent ?? DefaultLoadingComponent;
        if (error) {
            const errorProps = this.errorMap[Object.prototype.hasOwnProperty.call(this.errorMap, error)
                ? error
                : ErrorCodes.UNKNOWN_ERROR];
            return ErrorComponent ? React.createElement(ErrorComponent, { code: error, ...errorProps }) : null;
        }
        if (isLoading || !dataView) {
            return LoadingComponent ? React.createElement(LoadingComponent, null) : null;
        }
        return this.renderVisualization();
    }
    renderVisualization() {
        const { dataView, onDataTooLarge } = this.props;
        const dv = DataViewFacade.for(dataView);
        const geoData = getGeoData(dv, this.emptyHeaderString, this.nullHeaderString);
        const validationResult = this.validateData(geoData, this.props);
        if (validationResult?.isDataTooLarge) {
            invariant(onDataTooLarge, "GeoChart's onDataTooLarge callback is missing.");
            const { location } = geoData;
            const attributeHeaderItems = getGeoAttributeHeaderItems(dv, geoData);
            const locationData = location !== undefined ? attributeHeaderItems[location.index] : [];
            const limit = this.props.config?.limit ?? DEFAULT_DATA_POINTS_LIMIT;
            const errorMessage = `LocationData limit: ${limit} actual: ${locationData.length}`;
            onDataTooLarge(undefined, errorMessage);
            return null;
        }
        const geoChartOptions = this.buildGeoChartOptions(geoData, this.props);
        return React.createElement(GeoChartInner, { ...this.props, geoChartOptions: geoChartOptions });
    }
    buildGeoChartOptions = (geoData, props) => {
        const { segment } = geoData;
        const { config: { colors = [], colorPalette = [], colorMapping = [] } = {}, dataView } = props;
        const dv = DataViewFacade.for(dataView);
        const palette = getValidColorPalette(colors, colorPalette);
        const colorStrategy = getColorStrategy(palette, colorMapping, geoData, dv);
        const categoryItems = segment ? this.getCategoryLegendItems(colorStrategy) : [];
        return {
            geoData,
            categoryItems,
            colorStrategy,
            colorPalette: palette,
        };
    };
    getCategoryLegendItems(colorStrategy) {
        return createCategoryLegendItems(colorStrategy, this.emptyHeaderString, this.nullHeaderString);
    }
    validateData = (geoData, props) => {
        if (!props.dataView) {
            return;
        }
        const { dataView } = props;
        const limit = props.config?.limit ?? DEFAULT_DATA_POINTS_LIMIT;
        const dv = DataViewFacade.for(dataView);
        return {
            isDataTooLarge: !isDataOfReasonableSize(dv, geoData, limit),
        };
    };
}
export function createCategoryLegendItems(colorStrategy, emptyHeaderString, nullHeaderString) {
    const colorAssignment = colorStrategy.getColorAssignment();
    return colorAssignment.map((item, legendIndex) => {
        const { name, uri } = isResultAttributeHeader(item.headerItem)
            ? item.headerItem.attributeHeaderItem
            : { name: emptyHeaderString, uri: emptyHeaderString };
        const color = colorStrategy.getColorByIndex(legendIndex);
        return {
            uri: uri ?? nullHeaderString,
            name: name ?? nullHeaderString,
            color,
            legendIndex,
            isVisible: true,
        };
    });
}
//# sourceMappingURL=GeoChartOptionsWrapper.js.map