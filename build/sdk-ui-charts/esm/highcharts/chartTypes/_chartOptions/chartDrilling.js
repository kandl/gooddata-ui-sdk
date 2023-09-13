import { isBubbleChart, isHeatmap, isOneOfTypes, isScatterPlot, isTreemap, unwrap } from "../_util/common.js";
import omit from "lodash/omit.js";
import { getDrillIntersection, isSomeHeaderPredicateMatched, } from "@gooddata/sdk-ui";
import { multiMeasuresAlternatingTypes } from "./chartCapabilities.js";
import { findMeasureGroupInDimensions } from "../_util/executionResultHelper.js";
import without from "lodash/without.js";
function getViewBy(viewByAttribute, viewByIndex) {
    let viewByHeader = null;
    let viewByItem = null;
    let viewByAttributeDescriptor = null;
    if (viewByAttribute) {
        viewByHeader = viewByAttribute.items[viewByIndex];
        viewByItem = Object.assign(Object.assign({}, unwrap(viewByHeader)), { attribute: viewByAttribute });
        viewByAttributeDescriptor = { attributeHeader: omit(viewByAttribute, "items") };
    }
    return {
        viewByHeader,
        viewByItem,
        viewByAttributeDescriptor,
    };
}
function getStackBy(stackByAttribute, stackByIndex) {
    let stackByHeader = null;
    let stackByItem = null;
    let stackByAttributeDescriptor = null;
    if (stackByAttribute) {
        // stackBy item index is always equal to seriesIndex
        stackByHeader = stackByAttribute.items[stackByIndex];
        stackByItem = Object.assign(Object.assign({}, unwrap(stackByHeader)), { attribute: stackByAttribute });
        stackByAttributeDescriptor = { attributeHeader: omit(stackByAttribute, "items") };
    }
    return {
        stackByHeader,
        stackByItem,
        stackByAttributeDescriptor,
    };
}
export function getDrillableSeries(dv, series, drillableItems, viewByAttributes, stackByAttribute, type) {
    const [viewByChildAttribute, viewByParentAttribute] = viewByAttributes;
    const isMultiMeasureWithOnlyMeasures = isOneOfTypes(type, multiMeasuresAlternatingTypes) && !viewByChildAttribute;
    const measureGroup = findMeasureGroupInDimensions(dv.meta().dimensions());
    return series.map((seriesItem) => {
        var _a;
        const seriesIndex = seriesItem.seriesIndex;
        let isSeriesDrillable = false;
        let data = (_a = seriesItem.data) === null || _a === void 0 ? void 0 : _a.map((pointData, pointIndex) => {
            var _a, _b;
            let measureHeaders = [];
            const isStackedTreemap = isTreemap(type) && !!stackByAttribute;
            if (isScatterPlot(type)) {
                measureHeaders = ((_a = measureGroup.items) !== null && _a !== void 0 ? _a : []).slice(0, 2);
            }
            else if (isBubbleChart(type)) {
                measureHeaders = ((_b = measureGroup.items) !== null && _b !== void 0 ? _b : []).slice(0, 3);
            }
            else if (isStackedTreemap) {
                if (pointData.id !== undefined) {
                    // not leaf -> can't be drillable
                    return pointData;
                }
                const measureIndex = viewByChildAttribute ? 0 : parseInt(pointData.parent, 10);
                measureHeaders = [measureGroup.items[measureIndex]];
            }
            else {
                // measureIndex is usually seriesIndex,
                // except for stack by attribute and metricOnly pie or donut chart
                // it is looped-around pointIndex instead
                // Looping around the end of items array only works when
                // measureGroup is the last header on it's dimension
                // We do not support setups with measureGroup before attributeHeaders
                const measureIndex = !stackByAttribute && !isMultiMeasureWithOnlyMeasures
                    ? seriesIndex
                    : pointIndex % measureGroup.items.length;
                measureHeaders = [measureGroup.items[measureIndex]];
            }
            const viewByIndex = isHeatmap(type) || isStackedTreemap ? pointData.x : pointIndex;
            let stackByIndex = isHeatmap(type) || isStackedTreemap ? pointData.y : seriesIndex;
            if (isScatterPlot(type)) {
                stackByIndex = viewByIndex; // scatter plot uses stack by attribute but has only one serie
            }
            const { stackByHeader, stackByAttributeDescriptor } = getStackBy(stackByAttribute, stackByIndex);
            const { viewByHeader: viewByChildHeader, viewByAttributeDescriptor: viewByChildAttributeDescriptor, } = getViewBy(viewByChildAttribute, viewByIndex);
            const { viewByHeader: viewByParentHeader, viewByAttributeDescriptor: viewByParentAttributeDescriptor, } = getViewBy(viewByParentAttribute, viewByIndex);
            // point is drillable if a drillableItem matches:
            //   point's measure,
            //   point's viewBy attribute,
            //   point's viewBy attribute item,
            //   point's stackBy attribute,
            //   point's stackBy attribute item,
            const drillableHooks = without([
                ...measureHeaders,
                viewByChildAttributeDescriptor,
                viewByChildHeader,
                viewByParentAttributeDescriptor,
                viewByParentHeader,
                stackByAttributeDescriptor,
                stackByHeader,
            ], null);
            const drilldown = drillableHooks.some((drillableHook) => isSomeHeaderPredicateMatched(drillableItems, drillableHook, dv));
            const drillableProps = {
                drilldown,
            };
            if (drilldown) {
                const headers = [
                    ...measureHeaders,
                    viewByChildHeader,
                    viewByChildAttributeDescriptor,
                    viewByParentHeader,
                    viewByParentAttributeDescriptor,
                    stackByHeader,
                    stackByAttributeDescriptor,
                ];
                const sanitizedHeaders = without([...headers], null);
                drillableProps.drillIntersection = getDrillIntersection(sanitizedHeaders);
                isSeriesDrillable = true;
            }
            return Object.assign(Object.assign({}, pointData), drillableProps);
        });
        if (isScatterPlot(type)) {
            data = data.filter((dataItem) => {
                return dataItem.x !== null && dataItem.y !== null;
            });
        }
        return Object.assign(Object.assign({}, seriesItem), { data, isDrillable: isSeriesDrillable });
    });
}
//# sourceMappingURL=chartDrilling.js.map