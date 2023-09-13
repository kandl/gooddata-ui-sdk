// (C) 2019-2023 GoodData Corporation
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown, sanitizeTableProperties, } from "../drillDownUtil";
import cloneDeep from "lodash/cloneDeep";
import flatMap from "lodash/flatMap";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import { bucketAttribute, insightBucket, insightBuckets, insightHasDataDefined, insightProperties, insightSanitize, insightSorts, newAttributeSort, } from "@gooddata/sdk-model";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { CorePivotTable, pivotTableMenuForCapabilities, } from "@gooddata/sdk-ui-pivot";
import React from "react";
import ReactMeasure from "react-measure";
import { ATTRIBUTE, DATE, METRIC } from "../../../constants/bucket";
import { DASHBOARDS_ENVIRONMENT, ANALYTICAL_ENVIRONMENT } from "../../../constants/properties";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig";
import { getAllItemsByType, getItemsFromBuckets, getTotalsFromBucket, removeDuplicateBucketItems, sanitizeFilters, } from "../../../utils/bucketHelper";
import { generateDimensions } from "../../../utils/dimensions";
import { unmountComponentsAtNodes } from "../../../utils/domHelper";
import { getColumnWidthsFromProperties, getReferencePointWithSupportedProperties, } from "../../../utils/propertiesHelper";
import { getPivotTableDefaultUiConfig, setPivotTableUiConfig, } from "../../../utils/uiConfigHelpers/pivotTableUiConfigHelper";
import UnsupportedConfigurationPanel from "../../configurationPanels/UnsupportedConfigurationPanel";
import { AbstractPluggableVisualization } from "../AbstractPluggableVisualization";
import { PIVOT_TABLE_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties";
import { adaptMdObjectWidthItemsToPivotTable, adaptReferencePointWidthItemsToPivotTable, } from "./widthItemsHelpers";
import { adaptReferencePointSortItemsToPivotTable, addDefaultSort, sanitizePivotTableSorts, } from "./sortItemsHelpers";
import { removeInvalidTotals } from "./totalsHelpers";
export const getColumnAttributes = (buckets) => {
    return getItemsFromBuckets(buckets, [BucketNames.COLUMNS, BucketNames.STACK, BucketNames.SEGMENT], [ATTRIBUTE, DATE]);
};
export const getRowAttributes = (buckets) => {
    return getItemsFromBuckets(buckets, [
        BucketNames.ATTRIBUTE,
        BucketNames.ATTRIBUTES,
        BucketNames.VIEW,
        BucketNames.TREND,
        BucketNames.LOCATION,
    ], [ATTRIBUTE, DATE]);
};
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
        this.settings = (_a = props.featureFlags) !== null && _a !== void 0 ? _a : {};
        this.onColumnResized = this.onColumnResized.bind(this);
        this.handlePushData = this.handlePushData.bind(this);
        this.supportedPropertiesList = PIVOT_TABLE_SUPPORTED_PROPERTIES;
        this.backendCapabilities = props.backend.capabilities;
    }
    unmount() {
        unmountComponentsAtNodes([this.getElement(), this.getConfigPanelElement()]);
    }
    getExtendedReferencePoint(referencePoint, previousReferencePoint) {
        var _a, _b, _c, _d, _e;
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
        const totals = removeInvalidTotals(getTotalsFromBucket(buckets, BucketNames.ATTRIBUTE), filters);
        newReferencePoint.buckets = removeDuplicateBucketItems([
            {
                localIdentifier: BucketNames.MEASURES,
                items: measures,
            },
            Object.assign({ localIdentifier: BucketNames.ATTRIBUTE, items: rowAttributes }, (totals.length > 0 ? { totals } : null)),
            {
                localIdentifier: BucketNames.COLUMNS,
                items: columnAttributes,
            },
        ]);
        const originalSortItems = (_b = (_a = newReferencePoint.properties) === null || _a === void 0 ? void 0 : _a.sortItems) !== null && _b !== void 0 ? _b : [];
        const originalColumnWidths = (_d = (_c = newReferencePoint.properties) === null || _c === void 0 ? void 0 : _c.controls) === null || _d === void 0 ? void 0 : _d.columnWidths;
        const columnWidths = adaptReferencePointWidthItemsToPivotTable(originalColumnWidths, measures, rowAttributes, columnAttributes, previousRowAttributes ? previousRowAttributes : [], previousColumnAttributes ? previousColumnAttributes : [], filters);
        const controlsObj = columnWidths
            ? {
                controls: {
                    columnWidths,
                },
            }
            : {};
        newReferencePoint.properties = Object.assign({ sortItems: addDefaultSort(adaptReferencePointSortItemsToPivotTable(originalSortItems, measures, rowAttributes, columnAttributes), filters, rowAttributes, previousRowAttributes, columnAttributes, tableSortingCheckDisabled(this.settings)) }, controlsObj);
        setPivotTableUiConfig(newReferencePoint, this.intl, VisualizationTypes.TABLE);
        configurePercent(newReferencePoint, false);
        configureOverTimeComparison(newReferencePoint, !!((_e = this.settings) === null || _e === void 0 ? void 0 : _e["enableWeekFilters"]));
        Object.assign(newReferencePoint, getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList));
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    getInsightWithDrillDownApplied(sourceVisualization, drillDownContext, backendSupportsElementUris) {
        const drillDownInsight = modifyBucketsAttributesForDrillDown(sourceVisualization, drillDownContext.drillDefinition);
        const drillDownInsightWithFilters = addIntersectionFiltersToInsight(drillDownInsight, drillDownContext.event.drillContext.intersection, backendSupportsElementUris);
        return sanitizeTableProperties(insightSanitize(drillDownInsightWithFilters));
    }
    getExecution(options, insight, executionFactory) {
        var _a;
        const { dateFormat, executionConfig } = options;
        return executionFactory
            .forInsight(insight)
            .withDimensions(...this.getDimensions(insight))
            .withSorting(...((_a = getPivotTableSortItems(insight)) !== null && _a !== void 0 ? _a : []))
            .withDateFormat(dateFormat)
            .withExecConfig(executionConfig);
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
        const tableConfig = Object.assign(Object.assign(Object.assign({}, createPivotTableConfig(config, this.environment, this.settings, this.backendCapabilities, columnWidths)), customVisualizationConfig), { maxHeight,
            maxWidth });
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
            const sanitizedProperties = properties.sortItems
                ? Object.assign(Object.assign({}, properties), { sortItems: sanitizePivotTableSorts(properties.sortItems, insightBuckets(insight)) }) : properties;
            this.renderFun(React.createElement(UnsupportedConfigurationPanel, { locale: this.locale, pushData: this.pushData, properties: sanitizedProperties }), configPanelElement);
        }
    }
    getDimensions(insight) {
        return generateDimensions(insight, VisualizationTypes.TABLE);
    }
    adaptPropertiesToInsight(visualizationProperties, insight) {
        // This is sanitization of properties from KD vs current mdObject from AD
        const columnWidths = getColumnWidthsFromProperties(visualizationProperties);
        if (columnWidths) {
            this.sanitizeColumnWidths(columnWidths, insight);
        }
    }
    sanitizeColumnWidths(columnWidths, insight) {
        if (isEmpty(insightBuckets(insight))) {
            return;
        }
        const adaptedColumnWidths = adaptMdObjectWidthItemsToPivotTable(columnWidths, insight);
        if (!isEqual(columnWidths, adaptedColumnWidths)) {
            this.visualizationProperties.controls.columnWidths = adaptedColumnWidths;
            this.pushData({
                properties: {
                    controls: {
                        columnWidths: adaptedColumnWidths,
                    },
                },
            });
        }
    }
    onColumnResized(columnWidths) {
        this.pushData({
            properties: {
                controls: {
                    columnWidths,
                },
            },
        });
    }
    handlePushData(data) {
        var _a;
        if ((_a = data === null || data === void 0 ? void 0 : data.properties) === null || _a === void 0 ? void 0 : _a.sortItems) {
            this.pushData({
                properties: {
                    sortItems: data.properties.sortItems,
                },
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
/**
 * Given plug viz GDC config, current environment and platform settings, this creates pivot table config.
 *
 * @internal
 */
export function createPivotTableConfig(config, environment, settings, capabilities, columnWidths) {
    let tableConfig = {
        separators: config.separators,
    };
    if (environment !== DASHBOARDS_ENVIRONMENT) {
        tableConfig = Object.assign(Object.assign({}, tableConfig), { menu: pivotTableMenuForCapabilities(capabilities, {
                aggregations: true,
                aggregationsSubMenu: true,
            }) });
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
        return sanitizePivotTableSorts(sorts, insightBuckets(insight));
    }
    const rowBucket = insightBucket(insight, BucketNames.ATTRIBUTE);
    const rowAttribute = rowBucket && bucketAttribute(rowBucket);
    if (rowAttribute) {
        return [newAttributeSort(rowAttribute, "asc")];
    }
}
//# sourceMappingURL=PluggablePivotTable.js.map