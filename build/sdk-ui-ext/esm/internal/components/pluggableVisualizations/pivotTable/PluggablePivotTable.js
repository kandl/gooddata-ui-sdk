// (C) 2019-2023 GoodData Corporation
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown, sanitizeTableProperties, } from "../drillDownUtil.js";
import cloneDeep from "lodash/cloneDeep.js";
import flatMap from "lodash/flatMap.js";
import isNil from "lodash/isNil.js";
import isEmpty from "lodash/isEmpty.js";
import isEqual from "lodash/isEqual.js";
import { bucketAttribute, insightBucket, insightBuckets, insightHasDataDefined, insightProperties, insightSanitize, insightSorts, newAttributeSort, } from "@gooddata/sdk-model";
import { defaultImport } from "default-import";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { CorePivotTable, pivotTableMenuForCapabilities, } from "@gooddata/sdk-ui-pivot";
import React from "react";
import Measure from "react-measure";
import { ATTRIBUTE, DATE, METRIC } from "../../../constants/bucket.js";
import { DASHBOARDS_ENVIRONMENT, ANALYTICAL_ENVIRONMENT } from "../../../constants/properties.js";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig.js";
import { getAllItemsByType, getItemsFromBuckets, getTotalsFromBucket, removeDuplicateBucketItems, sanitizeFilters, } from "../../../utils/bucketHelper.js";
import { generateDimensions } from "../../../utils/dimensions.js";
import { getColumnHeadersPositionFromProperties, getColumnWidthsFromProperties, getReferencePointWithSupportedProperties, getMeasureGroupDimensionFromProperties, getSupportedPropertiesControls, getPivotTableProperties, } from "../../../utils/propertiesHelper.js";
import { getPivotTableDefaultUiConfig, setPivotTableUiConfig, } from "../../../utils/uiConfigHelpers/pivotTableUiConfigHelper.js";
import UnsupportedConfigurationPanel from "../../configurationPanels/UnsupportedConfigurationPanel.js";
import PivotTableConfigurationPanel from "../../configurationPanels/PivotTableConfigurationPanel.js";
import { AbstractPluggableVisualization } from "../AbstractPluggableVisualization.js";
import { PIVOT_TABLE_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties.js";
import { adaptMdObjectWidthItemsToPivotTable, adaptReferencePointWidthItemsToPivotTable, } from "./widthItemsHelpers.js";
import { adaptReferencePointSortItemsToPivotTable, addDefaultSort, getSanitizedSortItems, sanitizePivotTableSorts, } from "./sortItemsHelpers.js";
import { removeInvalidTotals } from "./totalsHelpers.js";
import { isSetColumnHeadersPositionToLeftAllowed } from "../../../utils/controlsHelper.js";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const ReactMeasure = defaultImport(Measure);
export const getColumnAttributes = (buckets) => {
    return getItemsFromBuckets(buckets, [BucketNames.COLUMNS, BucketNames.STACK, BucketNames.SEGMENT], [ATTRIBUTE, DATE]);
};
export const getRowAttributes = (buckets) => {
    return getItemsFromBuckets(buckets, [
        BucketNames.ATTRIBUTE,
        BucketNames.ATTRIBUTES,
        BucketNames.ATTRIBUTE_FROM,
        BucketNames.ATTRIBUTE_TO,
        BucketNames.VIEW,
        BucketNames.TREND,
        BucketNames.LOCATION,
    ], [ATTRIBUTE, DATE]);
};
const PROPERTIES_AFFECTING_REFERENCE_POINT = ["measureGroupDimension"];
/**
 * PluggablePivotTable
 *
 * ## Buckets
 *
 * | Name     | Id         | Accepts             |
 * |----------|------------|---------------------|
 * | Measures | measures   | measures only       |
 * | Rows     | attributes | attributes or dates |
 * | Columns  | columns    | attributes or dates |
 *
 * The Rows and Columns can each accept one date at most, unless "enableMultipleDates" FF is on.
 *
 * ### Bucket axioms
 *
 * - |Measures| ≤ 20
 * - |Rows| ≤ 20
 * - |Columns| ≤ 20
 * - |Measures| + |Rows| + |Columns| ≥ 1
 *
 * ## Dimensions
 *
 * The PluggablePivotTable always creates two dimensional execution.
 *
 * - |Measures| ≥ 1 ⇒ [[...Rows], [...Columns, MeasureGroupIdentifier]]
 * - |Measures| = 0 ⇒ [[...Rows], [...Columns]]
 *
 * ## Sorts
 *
 * Unless the user specifies otherwise, the sorts used by default are:
 *
 * - |Rows| ≥ 1 ⇒ [attributeSort(Rows[0])]
 */
export class PluggablePivotTable extends AbstractPluggableVisualization {
    constructor(props) {
        var _a;
        super(props);
        this.createCorePivotTableProps = () => {
            const onColumnResized = isManualResizingEnabled(this.settings) ? this.onColumnResized : undefined;
            return {
                intl: this.intl,
                ErrorComponent: null,
                LoadingComponent: null,
                onDrill: this.onDrill,
                afterRender: this.afterRender,
                onLoadingChanged: this.onLoadingChanged,
                pushData: this.handlePushData,
                onError: this.onError,
                onExportReady: this.onExportReady,
                onColumnResized,
            };
        };
        this.environment = props.environment;
        this.renderFun = props.renderFun;
        this.unmountFun = props.unmountFun;
        this.settings = (_a = props.featureFlags) !== null && _a !== void 0 ? _a : {};
        this.onColumnResized = this.onColumnResized.bind(this);
        this.handlePushData = this.handlePushData.bind(this);
        this.supportedPropertiesList = PIVOT_TABLE_SUPPORTED_PROPERTIES;
        this.propertiesAffectingReferencePoint = PROPERTIES_AFFECTING_REFERENCE_POINT;
        this.initializeProperties(props.visualizationProperties);
        this.backendCapabilities = props.backend.capabilities;
    }
    unmount() {
        this.unmountFun([this.getElement(), this.getConfigPanelElement()]);
    }
    getExtendedReferencePoint(referencePoint, previousReferencePoint) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const clonedReferencePoint = cloneDeep(referencePoint);
        const newReferencePoint = Object.assign(Object.assign({}, clonedReferencePoint), { uiConfig: getPivotTableDefaultUiConfig(multipleDatesEnabled(this.settings)) });
        const buckets = newReferencePoint.buckets;
        const measures = getAllItemsByType(buckets, [METRIC]);
        const rowAttributes = getRowAttributes(buckets);
        const previousRowAttributes = previousReferencePoint && getRowAttributes(previousReferencePoint.buckets);
        const columnAttributes = getColumnAttributes(buckets);
        const previousColumnAttributes = previousReferencePoint && getColumnAttributes(previousReferencePoint.buckets);
        const filters = newReferencePoint.filters
            ? flatMap(newReferencePoint.filters.items, (item) => item.filters)
            : [];
        const rowTotals = removeInvalidTotals(getTotalsFromBucket(buckets, BucketNames.ATTRIBUTE), filters);
        const colTotals = getTotalsFromBucket(buckets, BucketNames.COLUMNS);
        newReferencePoint.buckets = removeDuplicateBucketItems([
            {
                localIdentifier: BucketNames.MEASURES,
                items: measures,
            },
            Object.assign({ localIdentifier: BucketNames.ATTRIBUTE, items: rowAttributes }, (rowTotals.length > 0 ? { totals: rowTotals } : null)),
            Object.assign({ localIdentifier: BucketNames.COLUMNS, items: columnAttributes }, (colTotals.length > 0 ? { totals: colTotals } : null)),
        ]);
        const originalColumnWidths = (_b = (_a = newReferencePoint.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.columnWidths;
        const originalMeasureGroupDimension = (_d = (_c = newReferencePoint.properties) === null || _c === void 0 ? void 0 : _c.controls) === null || _d === void 0 ? void 0 : _d.measureGroupDimension;
        const originalSortItems = getSanitizedSortItems((_e = newReferencePoint.properties) === null || _e === void 0 ? void 0 : _e.sortItems, originalMeasureGroupDimension);
        const originalColumnHeadersPosition = shouldAdjustColumnHeadersPositionToTop(newReferencePoint, rowAttributes, originalMeasureGroupDimension)
            ? "top"
            : (_g = (_f = newReferencePoint.properties) === null || _f === void 0 ? void 0 : _f.controls) === null || _g === void 0 ? void 0 : _g.columnHeadersPosition;
        const columnWidths = adaptReferencePointWidthItemsToPivotTable(originalColumnWidths, measures, rowAttributes, columnAttributes, previousRowAttributes ? previousRowAttributes : [], previousColumnAttributes ? previousColumnAttributes : [], filters, originalMeasureGroupDimension);
        const measureGroupDimensionProp = tableTranspositionEnabled(this.settings) && originalMeasureGroupDimension
            ? {
                measureGroupDimension: originalMeasureGroupDimension,
            }
            : {};
        const columnHeaderPositionProp = tableColumnHeadersPositionEnabled(this.settings) && originalColumnHeadersPosition
            ? {
                columnHeadersPosition: originalColumnHeadersPosition,
            }
            : {};
        const controlsObj = columnWidths
            ? {
                controls: Object.assign(Object.assign({ columnWidths }, measureGroupDimensionProp), columnHeaderPositionProp),
            }
            : {
                controls: Object.assign(Object.assign({}, measureGroupDimensionProp), columnHeaderPositionProp),
            };
        newReferencePoint.properties = Object.assign({ sortItems: addDefaultSort(adaptReferencePointSortItemsToPivotTable(originalSortItems, measures, rowAttributes, columnAttributes), filters, rowAttributes, previousRowAttributes, columnAttributes, tableSortingCheckDisabled(this.settings)) }, controlsObj);
        setPivotTableUiConfig(newReferencePoint, this.intl, VisualizationTypes.TABLE, this.settings);
        configurePercent(newReferencePoint, false);
        configureOverTimeComparison(newReferencePoint, !!((_h = this.settings) === null || _h === void 0 ? void 0 : _h["enableWeekFilters"]));
        Object.assign(newReferencePoint, getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList));
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    getInsightWithDrillDownApplied(sourceVisualization, drillDownContext, backendSupportsElementUris) {
        const drillDownInsight = modifyBucketsAttributesForDrillDown(sourceVisualization, drillDownContext.drillDefinition);
        const drillDownInsightWithFilters = addIntersectionFiltersToInsight(drillDownInsight, drillDownContext.event.drillContext.intersection, backendSupportsElementUris);
        return sanitizeTableProperties(insightSanitize(drillDownInsightWithFilters));
    }
    getSanitizedConfig(insight, customVisualizationConfig) {
        if (!tableTranspositionEnabled(this.settings) &&
            ((customVisualizationConfig === null || customVisualizationConfig === void 0 ? void 0 : customVisualizationConfig.measureGroupDimension) === "rows" ||
                getMeasureGroupDimensionFromProperties(insightProperties(insight)) === "rows")) {
            // override custom position to default when FF disabled in meantime
            return Object.assign(Object.assign({}, (customVisualizationConfig || {})), { measureGroupDimension: "columns" });
        }
        return customVisualizationConfig;
    }
    getExecution(options, insight, executionFactory) {
        var _a;
        const { dateFormat, executionConfig, customVisualizationConfig } = options;
        const sanitizedConfig = this.getSanitizedConfig(insight, customVisualizationConfig);
        return executionFactory
            .forInsight(insight)
            .withDimensions(...this.getDimensions(insight, sanitizedConfig))
            .withSorting(...((_a = getPivotTableSortItems(insight)) !== null && _a !== void 0 ? _a : []))
            .withDateFormat(dateFormat)
            .withExecConfig(executionConfig);
    }
    initializeProperties(visualizationProperties) {
        const controls = visualizationProperties === null || visualizationProperties === void 0 ? void 0 : visualizationProperties.controls;
        const supportedProperties = getSupportedPropertiesControls(controls, this.supportedPropertiesList);
        const initialProperties = {
            supportedProperties: { controls: supportedProperties },
        };
        this.pushData({
            initialProperties,
        });
    }
    updateInstanceProperties(options, insight, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    insightPropertiesMeta) {
        super.updateInstanceProperties(options, insight, insightPropertiesMeta);
        /*
         * This was ported from v7. For some reason (likely related KD interop?) the entire content of properties
         * would be picked up and used.
         */
        this.visualizationProperties = insightProperties(insight);
        this.adaptPropertiesToInsight(this.visualizationProperties, this.currentInsight);
    }
    renderVisualization(options, insight, executionFactory) {
        if (!insightHasDataDefined(insight)) {
            // there is nothing in the insight's bucket that can be visualized
            // bail out
            return;
        }
        const { locale, custom, dimensions, config = {}, customVisualizationConfig = {}, theme } = options;
        const { maxHeight, maxWidth } = config;
        const height = dimensions === null || dimensions === void 0 ? void 0 : dimensions.height;
        const { drillableItems } = custom;
        const execution = this.getExecution(options, insight, executionFactory);
        const columnWidths = getColumnWidthsFromProperties(insightProperties(insight));
        const columnHeadersPosition = !isSetColumnHeadersPositionToLeftAllowed(insight)
            ? "top"
            : getColumnHeadersPositionFromProperties(insightProperties(insight));
        const measureGroupDimension = getMeasureGroupDimensionFromProperties(insightProperties(insight));
        const tableConfig = Object.assign(Object.assign(Object.assign({}, createPivotTableConfig(config, this.environment, this.settings, this.backendCapabilities, columnWidths)), customVisualizationConfig), { maxHeight,
            maxWidth,
            columnHeadersPosition,
            measureGroupDimension });
        const pivotTableProps = Object.assign(Object.assign({}, this.createCorePivotTableProps()), { execution,
            drillableItems, config: tableConfig, locale,
            theme });
        if (this.environment === DASHBOARDS_ENVIRONMENT) {
            this.renderFun(React.createElement(ReactMeasure, { client: true }, ({ measureRef, contentRect }) => {
                const clientHeight = contentRect.client.height;
                const pivotWrapperStyle = {
                    height: isNil(height) ? "100%" : height,
                    textAlign: "left",
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                };
                const configWithMaxHeight = Object.assign(Object.assign(Object.assign({}, tableConfig), { maxHeight: clientHeight }), customVisualizationConfig);
                return (React.createElement("div", { ref: measureRef, style: pivotWrapperStyle, className: "gd-table-dashboard-wrapper" },
                    React.createElement(CorePivotTable, Object.assign({}, pivotTableProps, { config: configWithMaxHeight }))));
            }), this.getElement());
        }
        else {
            this.renderFun(React.createElement(CorePivotTable, Object.assign({}, pivotTableProps)), this.getElement());
        }
    }
    renderConfigurationPanel(insight) {
        var _a;
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            const properties = (_a = this.visualizationProperties) !== null && _a !== void 0 ? _a : {};
            // we need to handle cases when attribute previously bearing the default sort is no longer available
            // and when measure sort is present but table is transposed
            const sanitizedProperties = properties.sortItems
                ? Object.assign(Object.assign({}, properties), { sortItems: sanitizePivotTableSorts(properties.sortItems, insightBuckets(insight), getMeasureGroupDimensionFromProperties(properties)) }) : properties;
            if (tableTranspositionEnabled(this.settings)) {
                this.renderFun(React.createElement(PivotTableConfigurationPanel, { locale: this.locale, properties: sanitizedProperties, propertiesMeta: this.propertiesMeta, insight: insight, pushData: this.handlePushData, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.settings }), configPanelElement);
            }
            else {
                this.renderFun(React.createElement(UnsupportedConfigurationPanel, { pushData: this.pushData, properties: sanitizedProperties }), configPanelElement);
            }
        }
    }
    getDimensions(insight, customVisualizationConfig) {
        return generateDimensions(insight, VisualizationTypes.TABLE, customVisualizationConfig);
    }
    adaptPropertiesToInsight(visualizationProperties, insight) {
        const measureGroupDimension = getMeasureGroupDimensionFromProperties(visualizationProperties);
        // This is sanitization of properties from KD vs current mdObject from AD
        const columnWidths = getColumnWidthsFromProperties(visualizationProperties);
        if (columnWidths) {
            this.sanitizeColumnWidths(columnWidths, insight, visualizationProperties, measureGroupDimension);
        }
    }
    sanitizeColumnWidths(columnWidths, insight, visualizationProperties, measureGroupDimension) {
        if (isEmpty(insightBuckets(insight))) {
            return;
        }
        const adaptedColumnWidths = adaptMdObjectWidthItemsToPivotTable(columnWidths, insight, measureGroupDimension);
        if (!isEqual(columnWidths, adaptedColumnWidths)) {
            this.visualizationProperties.controls.columnWidths = adaptedColumnWidths;
            this.pushData({
                properties: {
                    controls: Object.assign({ columnWidths: adaptedColumnWidths }, getPivotTableProperties(this.settings, visualizationProperties)),
                },
            });
        }
    }
    onColumnResized(columnWidths) {
        var _a;
        const properties = (_a = this.visualizationProperties) !== null && _a !== void 0 ? _a : {};
        this.pushData({
            properties: {
                controls: Object.assign({ columnWidths }, getPivotTableProperties(this.settings, properties)),
            },
        });
    }
    handlePushData(data) {
        var _a, _b, _c, _d;
        if ((_a = data === null || data === void 0 ? void 0 : data.properties) === null || _a === void 0 ? void 0 : _a.sortItems) {
            const addTotals = ((_b = data === null || data === void 0 ? void 0 : data.properties) === null || _b === void 0 ? void 0 : _b.totals)
                ? {
                    totals: (_c = data === null || data === void 0 ? void 0 : data.properties) === null || _c === void 0 ? void 0 : _c.totals,
                    bucketType: (_d = data === null || data === void 0 ? void 0 : data.properties) === null || _d === void 0 ? void 0 : _d.bucketType,
                }
                : {};
            this.pushData({
                properties: Object.assign(Object.assign({ sortItems: data.properties.sortItems }, (data.properties.controls ? { controls: data.properties.controls } : {})), addTotals),
            });
        }
        else {
            this.pushData(data);
        }
    }
}
function isManualResizingEnabled(settings) {
    return settings.enableTableColumnsManualResizing === true;
}
function multipleDatesEnabled(settings) {
    return settings.enableMultipleDates === true;
}
function tableSortingCheckDisabled(settings) {
    return settings.tableSortingCheckDisabled === true;
}
function tableTranspositionEnabled(settings) {
    return settings.enablePivotTableTransposition === true;
}
function tableColumnHeadersPositionEnabled(settings) {
    return settings.enableColumnHeadersPosition === true;
}
/**
 * Given plug viz GDC config, current environment and platform settings, this creates pivot table config.
 *
 * @internal
 */
export function createPivotTableConfig(config, environment, settings, capabilities, columnWidths) {
    let tableConfig = {
        separators: config.separators,
    };
    const enableTableTotalRows = settings.enableTableTotalRows;
    if (environment !== DASHBOARDS_ENVIRONMENT) {
        tableConfig = Object.assign(Object.assign({}, tableConfig), { menu: pivotTableMenuForCapabilities(capabilities, {
                aggregations: true,
                aggregationsSubMenu: true,
            }) });
    }
    if (enableTableTotalRows) {
        tableConfig = Object.assign(Object.assign({}, tableConfig), { menu: Object.assign(Object.assign({}, tableConfig.menu), { aggregationsSubMenuForRows: true }) });
    }
    const autoSize = settings.enableTableColumnsAutoResizing;
    // the growToFit can only be enabled in dashboards
    const growToFit = environment === DASHBOARDS_ENVIRONMENT && settings.enableTableColumnsGrowToFit;
    const manualResizing = settings.enableTableColumnsManualResizing;
    let columnSizing = {};
    if (autoSize) {
        columnSizing = {
            defaultWidth: config.isExportMode ? "viewport" : "autoresizeAll",
        };
    }
    if (growToFit) {
        columnSizing = Object.assign(Object.assign({}, columnSizing), { growToFit: true });
    }
    if (manualResizing && columnWidths && columnWidths.length > 0) {
        columnSizing = Object.assign(Object.assign({}, columnSizing), { columnWidths });
    }
    if (environment === ANALYTICAL_ENVIRONMENT) {
        columnSizing = Object.assign(Object.assign({}, columnSizing), { growToFit: false });
    }
    return Object.assign(Object.assign({}, tableConfig), { columnSizing });
}
/**
 * This function exists to overcome AD weirdness where AD will sometimes send insight without any
 * sorts even if the pivot table should be sorted by default by the first row attribute in ascending order. Code here
 * fixes this symptom and ensures the default sort is in place.
 *
 * Note: while this may seem small thing, it's actually a messy business. When rendering / switching to the pivot
 * table the AD will call update/render multiple times. Sometimes with sort items, sometimes without sort items. This
 * can seriously mess up the pivot table in return: the column resizing is susceptible to race conditions and timing
 * issues. Because of the flurry of calls, the table may not render or may render not resized at all.
 */
function getPivotTableSortItems(insight) {
    const sorts = insightSorts(insight);
    const mesureGroupDimension = getMeasureGroupDimensionFromProperties(insightProperties(insight));
    if (!isEmpty(sorts)) {
        /*
         * This is here to ensure that when rendering pivot table in KD, all invalid sort items
         * are filtered out. At this moment, core pivot table does not handle invalid sorts so well and
         * they can knock it off balance and it won't show up (interplay with resizing).
         *
         * Fixing core pivot to strip out invalid sorts has to happen one day - however regardless of that,
         * it is still the responsibility of the PluggablePivotTable to call the CorePivot correctly and so this
         * sanitization here also makes sense.
         */
        return sanitizePivotTableSorts(sorts, insightBuckets(insight), mesureGroupDimension);
    }
    const rowBucket = insightBucket(insight, BucketNames.ATTRIBUTE);
    const rowAttribute = rowBucket && bucketAttribute(rowBucket);
    if (rowAttribute) {
        return [newAttributeSort(rowAttribute, "asc")];
    }
}
function shouldAdjustColumnHeadersPositionToTop(newReferencePoint, rowAttributes, measureGroupDimension) {
    var _a, _b;
    return (((_b = (_a = newReferencePoint.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.columnHeadersPosition) &&
        (rowAttributes.length > 0 || measureGroupDimension === "columns"));
}
//# sourceMappingURL=PluggablePivotTable.js.map