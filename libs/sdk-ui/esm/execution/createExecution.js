// (C) 2019-2022 GoodData Corporation
import { isAttribute, isMeasure, MeasureGroupIdentifier, newDimension, newTwoDimensional, } from "@gooddata/sdk-model";
import compact from "lodash/compact.js";
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
/**
 * When caller desires just data series and no slicing, create a single-dim result.
 */
function seriesOnlyDim(seriesBy) {
    return [
        newDimension(compact([
            ...seriesBy.filter(isAttribute),
            // only include MeasureGroupIdentifier if there are some measures, otherwise the execution will always fail on the backend
            seriesBy.some(isMeasure) && MeasureGroupIdentifier,
        ])),
    ];
}
/**
 * When caller desires data series to be sliced further by some attributes (and perhaps with totals as well)
 * then create two-dim result resembling a pivot table:
 *
 * -  slices are in rows (first dim)
 * -  measures & scoping attributes will be in columns (second dim)
 */
function seriesAndSlicesDim(seriesBy, slices, totals) {
    return newTwoDimensional([...slices, ...totals], compact([
        ...seriesBy.filter(isAttribute),
        // only include MeasureGroupIdentifier if there are some measures, otherwise the execution will always fail on the backend
        seriesBy.some(isMeasure) && MeasureGroupIdentifier,
    ]));
}
/**
 * Given execute props, this will prepare execution to send to backend.
 *
 * @param options - create execution options
 * @internal
 */
export function createExecution(options) {
    const { backend, workspace, seriesBy = [], slicesBy = [], filters = [], sortBy = [], totals = [], componentName = "Execution", } = options;
    invariant(backend && workspace, "backend and workspace must be either specified explicitly or be provided by context");
    const dimensions = isEmpty(slicesBy)
        ? seriesOnlyDim(seriesBy)
        : seriesAndSlicesDim(seriesBy, slicesBy, totals);
    return backend
        .withTelemetry(componentName, options)
        .workspace(workspace)
        .execution()
        .forItems(seriesBy.concat(slicesBy), filters)
        .withSorting(...sortBy)
        .withDimensions(...dimensions);
}
//# sourceMappingURL=createExecution.js.map