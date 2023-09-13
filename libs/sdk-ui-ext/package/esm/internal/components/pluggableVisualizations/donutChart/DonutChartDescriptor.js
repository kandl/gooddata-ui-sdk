import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableDonutChart } from "./PluggableDonutChart";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, multipleAttributesOrMeasuresBucketConversion, singleAttributeBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";
export class DonutChartDescriptor extends BaseChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "DonutChart",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                measures: multipleAttributesOrMeasuresBucketConversion("measures", BucketNames.MEASURES),
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
        return (params) => new PluggableDonutChart(params);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/donut_chart_component.html",
            supportsExport: true,
            supportsZooming: false,
        };
    }
}
//# sourceMappingURL=DonutChartDescriptor.js.map