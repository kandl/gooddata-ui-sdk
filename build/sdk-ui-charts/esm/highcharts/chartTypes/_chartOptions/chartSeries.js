import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { isBubbleChart, isBulletChart, isHeatmap, isOneOfTypes, isSankeyOrDependencyWheel, isScatterPlot, isTreemap, isWaterfall, parseValue, unwrap, } from "../_util/common.js";
import { multiMeasuresAlternatingTypes } from "./chartCapabilities.js";
import { getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { getHeatmapSeries } from "../heatmap/heatmapChartSeries.js";
import { getScatterPlotSeries } from "../scatterPlot/scatterPlotSeries.js";
import { getBubbleChartSeries } from "../bubbleChart/bubbleChartSeries.js";
import { getTreemapStackedSeries } from "../treemap/treemapChartSeries.js";
import { getBulletChartSeries } from "../bulletChart/bulletChartSeries.js";
import { buildSankeyChartSeries } from "../sankeyChart/sankeyChartOptions.js";
import { getWaterfallChartSeries } from "../waterfallChart/waterfallChartsSeries.js";
export function getSeriesItemData(seriesItem, seriesIndex, measureGroup, viewByAttribute, stackByAttribute, type, colorStrategy, emptyHeaderTitle) {
    return seriesItem.map((pointValue, pointIndex) => {
        // by default seriesIndex corresponds to measureGroup label index
        let measureIndex = seriesIndex;
        // by default pointIndex corresponds to viewBy label index
        let viewByIndex = pointIndex;
        // drillContext can have 1 to 3 items
        // viewBy attribute label, stackby label if available
        // last drillContextItem is always current serie measure
        if (stackByAttribute) {
            // pointIndex corresponds to viewBy attribute label (if available)
            viewByIndex = pointIndex;
            // stack bar chart has always just one measure
            measureIndex = 0;
        }
        else if (isOneOfTypes(type, multiMeasuresAlternatingTypes) && !viewByAttribute) {
            measureIndex = pointIndex;
        }
        let valueProp = {
            y: parseValue(pointValue),
        };
        if (isTreemap(type)) {
            valueProp = {
                value: parseValue(pointValue),
            };
        }
        const pointData = Object.assign(Object.assign(Object.assign({}, valueProp), { format: unwrap(measureGroup.items[measureIndex]).format }), pointValue === null
            ? {
                marker: {
                    enabled: false,
                },
            }
            : {});
        if (stackByAttribute) {
            // if there is a stackBy attribute, then seriesIndex corresponds to stackBy label index
            pointData.name = valueWithEmptyHandling(getMappingHeaderFormattedName(stackByAttribute.items[seriesIndex]), emptyHeaderTitle);
        }
        else if (isOneOfTypes(type, multiMeasuresAlternatingTypes) && viewByAttribute) {
            pointData.name = valueWithEmptyHandling(getMappingHeaderFormattedName(viewByAttribute.items[viewByIndex]), emptyHeaderTitle);
        }
        else {
            pointData.name = valueWithEmptyHandling(unwrap(measureGroup.items[measureIndex]).name, emptyHeaderTitle);
        }
        if (isOneOfTypes(type, multiMeasuresAlternatingTypes)) {
            pointData.color = colorStrategy.getColorByIndex(pointIndex);
            // Pie and Treemap charts use pointData viewByIndex as legendIndex if available
            // instead of seriesItem legendIndex
            pointData.legendIndex = viewByAttribute ? viewByIndex : pointIndex;
        }
        return pointData;
    });
}
function getDefaultSeries(dv, measureGroup, viewByAttribute, stackByAttribute, type, colorStrategy, emptyHeaderTitle) {
    return dv
        .rawData()
        .twoDimData()
        .map((seriesItem, seriesIndex) => {
        const seriesItemData = getSeriesItemData(seriesItem, seriesIndex, measureGroup, viewByAttribute, stackByAttribute, type, colorStrategy, emptyHeaderTitle);
        const seriesItemConfig = {
            color: colorStrategy.getColorByIndex(seriesIndex),
            legendIndex: seriesIndex,
            data: seriesItemData,
            seriesIndex,
        };
        if (stackByAttribute) {
            // if stackBy attribute is available, seriesName is a stackBy attribute value of index seriesIndex
            // this is a limitation of highcharts and a reason why you can not have multi-measure stacked charts
            seriesItemConfig.name = valueWithEmptyHandling(getMappingHeaderFormattedName(stackByAttribute.items[seriesIndex]), emptyHeaderTitle);
        }
        else if (isOneOfTypes(type, multiMeasuresAlternatingTypes) && !viewByAttribute) {
            // Pie charts with measures only have a single series which name would is ambiguous
            seriesItemConfig.name = measureGroup.items
                .map((wrappedMeasure) => valueWithEmptyHandling(unwrap(wrappedMeasure).name, emptyHeaderTitle))
                .join(", ");
        }
        else {
            // otherwise seriesName is a measure name of index seriesIndex
            seriesItemConfig.name = valueWithEmptyHandling(measureGroup.items[seriesIndex].measureHeaderItem.name, emptyHeaderTitle);
        }
        const turboThresholdProp = isTreemap(type) ? { turboThreshold: 0 } : {};
        return Object.assign(Object.assign({}, seriesItemConfig), turboThresholdProp);
    });
}
export function getSeries(dv, measureGroup, viewByAttribute, viewByParentAttribute, stackByAttribute, type, colorStrategy, emptyHeaderTitle, theme) {
    if (isHeatmap(type)) {
        return getHeatmapSeries(dv, measureGroup, theme);
    }
    else if (isScatterPlot(type)) {
        return getScatterPlotSeries(dv, stackByAttribute, colorStrategy, emptyHeaderTitle);
    }
    else if (isBubbleChart(type)) {
        return getBubbleChartSeries(dv, measureGroup, stackByAttribute, colorStrategy, emptyHeaderTitle);
    }
    else if (isTreemap(type) && stackByAttribute) {
        return getTreemapStackedSeries(dv, measureGroup, viewByAttribute, stackByAttribute, colorStrategy, emptyHeaderTitle);
    }
    else if (isBulletChart(type)) {
        return getBulletChartSeries(dv, measureGroup, colorStrategy);
    }
    else if (isSankeyOrDependencyWheel(type)) {
        return buildSankeyChartSeries(dv, [viewByParentAttribute, viewByAttribute], colorStrategy, emptyHeaderTitle);
    }
    else if (isWaterfall(type)) {
        return getWaterfallChartSeries(dv, measureGroup, viewByAttribute, colorStrategy, emptyHeaderTitle);
    }
    return getDefaultSeries(dv, measureGroup, viewByAttribute, stackByAttribute, type, colorStrategy, emptyHeaderTitle);
}
//# sourceMappingURL=chartSeries.js.map