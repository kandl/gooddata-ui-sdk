import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableLineChart } from "./PluggableLineChart";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown, reverseAndTrimIntersection, } from "../drillDownUtil";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, multipleAttributesOrMeasuresBucketConversion, singleAttributeBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";
export class LineChartDescriptor extends BaseChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "LineChart",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                measures: multipleAttributesOrMeasuresBucketConversion("measures", BucketNames.MEASURES),
                trendBy: singleAttributeBucketConversion("trendBy", BucketNames.TREND),
                segmentBy: singleAttributeBucketConversion("segmentBy", BucketNames.SEGMENT),
                filters: filtersInsightConversion("filters"),
                sortBy: sortsInsightConversion("sortBy"),
                config: chartConfigInsightConversion("config"),
                locale: localeInsightConversion("locale"),
                execConfig: executionConfigInsightConversion("execConfig"),
            }),
            additionalFactories: chartAdditionalFactories(),
        });
    }
    getFactory() {
        return (params) => new PluggableLineChart(params);
    }
    applyDrillDown(source, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFilters(source, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/line_chart_component.html",
            supportsExport: true,
            supportsZooming: true,
        };
    }
    addFilters(source, drillConfig, event, backendSupportsElementUris) {
        const cutIntersection = reverseAndTrimIntersection(drillConfig, event.drillContext.intersection);
        return addIntersectionFiltersToInsight(source, cutIntersection, backendSupportsElementUris);
    }
}
//# sourceMappingURL=LineChartDescriptor.js.map