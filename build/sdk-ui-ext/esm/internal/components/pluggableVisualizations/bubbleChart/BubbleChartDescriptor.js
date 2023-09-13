import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableBubbleChart } from "./PluggableBubbleChart.js";
import { BigChartDescriptor } from "../BigChartDescriptor.js";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, singleAttributeBucketConversion, singleMeasureBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator/index.js";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils.js";
export class BubbleChartDescriptor extends BigChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "BubbleChart",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                xAxisMeasure: singleMeasureBucketConversion("xAxisMeasure", BucketNames.MEASURES),
                yAxisMeasure: singleMeasureBucketConversion("yAxisMeasure", BucketNames.SECONDARY_MEASURES),
                size: singleMeasureBucketConversion("size", BucketNames.TERTIARY_MEASURES),
                viewBy: singleAttributeBucketConversion("viewBy", BucketNames.VIEW),
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
        return (params) => new PluggableBubbleChart(params);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/bubble_chart_component.html",
            supportsExport: true,
            supportsZooming: true,
        };
    }
}
//# sourceMappingURL=BubbleChartDescriptor.js.map