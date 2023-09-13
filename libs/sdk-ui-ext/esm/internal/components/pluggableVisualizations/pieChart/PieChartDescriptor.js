import { BucketNames } from "@gooddata/sdk-ui";
import { PluggablePieChart } from "./PluggablePieChart.js";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor.js";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, multipleAttributesOrMeasuresBucketConversion, singleAttributeBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator/index.js";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils.js";
export class PieChartDescriptor extends BaseChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "PieChart",
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
        return (params) => new PluggablePieChart(params);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/pie_chart_component.html",
            supportsExport: true,
            supportsZooming: false,
        };
    }
}
//# sourceMappingURL=PieChartDescriptor.js.map