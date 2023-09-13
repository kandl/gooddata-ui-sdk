// (C) 2020-2022 GoodData Corporation
import { getAttributeHeaderItemName, getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { getLighterColor, valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { parseValue, unwrap } from "../_util/common.js";
import isEqual from "lodash/isEqual.js";
function getColorStep(valuesCount) {
    const MAX_COLOR_BRIGHTNESS = 0.8;
    return MAX_COLOR_BRIGHTNESS / valuesCount;
}
function gradientPreviousGroup(solidColorLeafs) {
    const colorChange = getColorStep(solidColorLeafs.length);
    return solidColorLeafs.map((leaf, index) => (Object.assign(Object.assign({}, leaf), { color: getLighterColor(leaf.color, colorChange * index) })));
}
function getRootPoint(rootName, index, format, colorStrategy, emptyHeaderTitle) {
    return {
        id: `${index}`,
        name: valueWithEmptyHandling(rootName, emptyHeaderTitle),
        color: colorStrategy.getColorByIndex(index),
        showInLegend: true,
        legendIndex: index,
        format,
    };
}
function getLeafPoint(stackByAttribute, parentIndex, seriesIndex, data, format, colorStrategy, emptyHeaderTitle) {
    return {
        name: valueWithEmptyHandling(getMappingHeaderFormattedName(stackByAttribute.items[seriesIndex]), emptyHeaderTitle),
        parent: `${parentIndex}`,
        value: parseValue(data),
        x: seriesIndex,
        y: seriesIndex,
        showInLegend: false,
        color: colorStrategy.getColorByIndex(parentIndex),
        format,
    };
}
function isLastSerie(seriesIndex, dataLength) {
    return seriesIndex === dataLength - 1;
}
export function getTreemapStackedSeriesDataWithViewBy(dv, measureGroup, viewByAttribute, stackByAttribute, colorStrategy, emptyHeaderTitle) {
    const roots = [];
    const leafs = [];
    let rootId = -1;
    let uncoloredLeafs = [];
    let lastRoot = null;
    const executionResultData = dv.rawData().twoDimData();
    const dataLength = executionResultData.length;
    const format = unwrap(measureGroup.items[0]).format; // this configuration has only one measure
    executionResultData.forEach((seriesItems, seriesIndex) => {
        const currentRoot = viewByAttribute.items[seriesIndex].attributeHeaderItem;
        if (!isEqual(currentRoot, lastRoot)) {
            // store previous group leafs
            leafs.push(...gradientPreviousGroup(uncoloredLeafs));
            rootId++;
            lastRoot = currentRoot;
            uncoloredLeafs = [];
            // create parent for pasted leafs
            const lastRootName = getAttributeHeaderItemName(lastRoot);
            roots.push(getRootPoint(lastRootName, rootId, format, colorStrategy, emptyHeaderTitle));
        }
        // create leafs which will be colored at the end of group
        uncoloredLeafs.push(getLeafPoint(stackByAttribute, rootId, seriesIndex, seriesItems[0], format, colorStrategy, emptyHeaderTitle));
        if (isLastSerie(seriesIndex, dataLength)) {
            // store last group leafs
            leafs.push(...gradientPreviousGroup(uncoloredLeafs));
        }
    });
    return [...roots, ...leafs]; // roots need to be first items in data to keep legend working
}
export function getTreemapStackedSeriesDataWithMeasures(dv, measureGroup, 
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
stackByAttribute, colorStrategy, emptyHeaderTitle) {
    let data = measureGroup.items.map((measureGroupItem, index) => {
        return {
            id: `${index}`,
            name: valueWithEmptyHandling(measureGroupItem.measureHeaderItem.name, emptyHeaderTitle),
            format: measureGroupItem.measureHeaderItem.format,
            color: colorStrategy.getColorByIndex(index),
            showInLegend: true,
            legendIndex: index,
        };
    });
    dv.rawData()
        .twoDimData()
        .forEach((seriesItems, seriesIndex) => {
        const colorChange = getColorStep(seriesItems.length);
        const unsortedLeafs = seriesItems.map((seriesItem, seriesItemIndex) => {
            return {
                name: valueWithEmptyHandling(getMappingHeaderFormattedName(stackByAttribute.items[seriesItemIndex]), emptyHeaderTitle),
                parent: `${seriesIndex}`,
                format: unwrap(measureGroup.items[seriesIndex]).format,
                value: parseValue(seriesItem),
                x: seriesIndex,
                y: seriesItemIndex,
                showInLegend: false,
            };
        });
        const sortedLeafs = unsortedLeafs.sort((a, b) => b.value - a.value);
        data = [
            ...data,
            ...sortedLeafs.map((leaf, seriesItemIndex) => (Object.assign(Object.assign({}, leaf), { color: getLighterColor(colorStrategy.getColorByIndex(seriesIndex), colorChange * seriesItemIndex) }))),
        ];
    });
    return data;
}
export function getTreemapStackedSeries(dv, measureGroup, viewByAttribute, stackByAttribute, colorStrategy, emptyHeaderTitle) {
    let data = [];
    if (viewByAttribute) {
        data = getTreemapStackedSeriesDataWithViewBy(dv, measureGroup, viewByAttribute, stackByAttribute, colorStrategy, emptyHeaderTitle);
    }
    else {
        data = getTreemapStackedSeriesDataWithMeasures(dv, measureGroup, stackByAttribute, colorStrategy, emptyHeaderTitle);
    }
    const seriesName = measureGroup.items.map((wrappedMeasure) => unwrap(wrappedMeasure).name).join(", ");
    return [
        {
            name: valueWithEmptyHandling(seriesName, emptyHeaderTitle),
            legendType: "point",
            showInLegend: true,
            data,
            turboThreshold: 0,
            seriesIndex: 0,
        },
    ];
}
//# sourceMappingURL=treemapChartSeries.js.map