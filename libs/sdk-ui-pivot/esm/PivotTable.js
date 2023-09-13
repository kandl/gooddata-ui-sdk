// (C) 2007-2022 GoodData Corporation
import React from "react";
import { CorePivotTableAgImpl } from "./CorePivotTable.js";
import { bucketAttributes, bucketIsEmpty, bucketsFind, bucketTotals, MeasureGroupIdentifier, newBucket, newTwoDimensional, isMeasureSort, } from "@gooddata/sdk-model";
import omit from "lodash/omit.js";
import { IntlTranslationsProvider, withContexts, BucketNames, IntlWrapper, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { invariant } from "ts-invariant";
import { AVAILABLE_TOTALS } from "./impl/base/constants.js";
/**
 * Prepares new execution matching pivot table props.
 *
 * @param props - pivot table props
 * @returns new prepared execution
 */
function prepareExecution(props) {
    const { backend, workspace, filters, sortBy = [], execConfig = {}, config = {} } = props;
    const sanitizedSortBy = getSanitizedPivotTableSortBy(sortBy, isTransposed(config));
    return backend
        .withTelemetry("PivotTable", props)
        .workspace(workspace)
        .execution()
        .forBuckets(getBuckets(props), filters)
        .withDimensions((def) => getPivotTableDimensions(def.buckets, isTransposed(config)))
        .withSorting(...sanitizedSortBy)
        .withExecConfig(execConfig);
}
function getBuckets(props) {
    const { measures = [], rows = [], columns = [], totals = [], } = props;
    const rowTotals = totals.filter((total) => rows.find((attr) => attr.attribute.localIdentifier === total.attributeIdentifier));
    const colTotals = totals.filter((total) => columns.find((attr) => attr.attribute.localIdentifier === total.attributeIdentifier));
    return [
        newBucket(BucketNames.MEASURES, ...measures),
        // ATTRIBUTE for backwards compatibility with Table component. Actually ROWS
        newBucket(BucketNames.ATTRIBUTE, ...rows, ...rowTotals),
        newBucket(BucketNames.COLUMNS, ...columns, ...colTotals),
    ];
}
function isTransposed(config) {
    var _a;
    const measureGroupDimension = (_a = config.measureGroupDimension) !== null && _a !== void 0 ? _a : "columns";
    return measureGroupDimension === "rows";
}
const validateConfig = (props) => {
    const { rows, config = {} } = props;
    if (config.columnHeadersPosition === "left") {
        if (!rows && config.measureGroupDimension === "rows") {
            return config;
        }
        else {
            console.warn("Invalid table configuration. `columnHeadersPosition: left` requires metrics in rows and no row attributes defined");
            return Object.assign(Object.assign({}, config), { columnHeadersPosition: "top" });
        }
    }
    return config;
};
class RenderPivotTable extends React.Component {
    render() {
        const { exportTitle, backend, workspace, config = {} } = this.props;
        invariant(backend, "Backend was not provided for PivotTable. Either pass it as a prop or use BackendContext.");
        invariant(workspace, "Workspace was not provided for PivotTable. Either pass it as a prop or use WorkspaceContext.");
        const newProps = omit(this.props, ["measures", "rows", "columns", "totals", "filters", "sortBy"]);
        const pivotTableConfig = Object.assign(Object.assign({}, validateConfig(this.props)), { menu: pivotTableMenuForCapabilities(backend.capabilities, config === null || config === void 0 ? void 0 : config.menu) });
        const corePivotProps = omit(newProps, ["backend", "workspace"]);
        const execution = prepareExecution(this.props);
        return (React.createElement(IntlWrapper, { locale: this.props.locale },
            React.createElement(IntlTranslationsProvider, null, (translationProps) => {
                return (React.createElement(CorePivotTableAgImpl, Object.assign({}, corePivotProps, { config: pivotTableConfig, intl: translationProps.intl, execution: execution, exportTitle: exportTitle || "PivotTable" })));
            })));
    }
}
const WrappedPivotTable = withContexts(RenderPivotTable);
/**
 * [PivotTable](https://sdk.gooddata.com/gooddata-ui/docs/pivot_table_component.html)
 * is a component with bucket props measures, rows, columns, totals, sortBy, filters
 *
 * @public
 */
export const PivotTable = (props) => {
    const [measures, columns, rows, totals, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.columns, props.rows, props.totals, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return React.createElement(WrappedPivotTable, Object.assign({}, props, { measures, columns, rows, totals, filters, sortBy }));
};
/**
 * Given analytical backend capabilities and the desired aggregations menu config.
 *
 * @remarks
 * This function will correct the menu configuration so that it fits the capabilities.
 *
 * The function will explicitly set the options regardless of what is the (current) default value of the option if
 * it is not present in the menu. The backend capabilities are a hard stop for features.
 *
 * Note: the {@link PivotTable} will use this function out of the box to ensure the effective menu configuration
 * matches the backend capabilities. You don't need to use when creating a PivotTable.
 *
 * @param capabilities - Backend capabilities
 * @param desiredMenu - Aggregation menu configuration desired by the client
 * @public
 */
export function pivotTableMenuForCapabilities(capabilities, desiredMenu = {}) {
    var _a, _b;
    const effectiveMenu = Object.assign({}, desiredMenu);
    if (!capabilities.canCalculateGrandTotals) {
        return {
            aggregations: false,
        };
    }
    if (!capabilities.canCalculateNativeTotals) {
        effectiveMenu.aggregationTypes = ((_a = effectiveMenu.aggregationTypes) !== null && _a !== void 0 ? _a : AVAILABLE_TOTALS).filter((totalType) => totalType !== "nat");
    }
    if (((_b = effectiveMenu.aggregationTypes) === null || _b === void 0 ? void 0 : _b.length) === 0) {
        return {
            aggregations: false,
        };
    }
    return effectiveMenu;
}
/**
 * Prepares dimensions for pivot table execution from buckets and info if table is transposed or not.
 *
 * @param buckets - table buckets
 * @param isTransposed - whether table is transposed (metrics are in rows)
 * @public
 */
export function getPivotTableDimensions(buckets, isTransposed) {
    const row = bucketsFind(buckets, BucketNames.ATTRIBUTE);
    const columns = bucketsFind(buckets, BucketNames.COLUMNS);
    const measures = bucketsFind(buckets, BucketNames.MEASURES);
    const rowAttributes = row ? bucketAttributes(row) : [];
    const columnAttributes = columns ? bucketAttributes(columns) : [];
    const measuresItemIdentifiers = measures && !bucketIsEmpty(measures) ? [MeasureGroupIdentifier] : [];
    const rowTotals = row ? bucketTotals(row) : [];
    const colTotals = columns ? bucketTotals(columns) : [];
    const rowMeasureItemIdentifiers = isTransposed ? measuresItemIdentifiers : [];
    const columnMeasureItemIdentifiers = isTransposed ? [] : measuresItemIdentifiers;
    return newTwoDimensional([...rowAttributes, ...rowMeasureItemIdentifiers, ...rowTotals], [...columnAttributes, ...colTotals, ...columnMeasureItemIdentifiers]);
}
function getSanitizedPivotTableSortBy(sortBy, isTransposed) {
    // Measure sort is not supported on transposed table (metrics in rows).
    if (isTransposed) {
        return sortBy.filter((item) => !isMeasureSort(item));
    }
    return sortBy;
}
//# sourceMappingURL=PivotTable.js.map