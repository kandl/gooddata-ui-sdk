import { BucketNames } from "@gooddata/sdk-ui";
import { PluggablePyramidChart } from "./PluggablePyramidChart.js";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor.js";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, multipleAttributesOrMeasuresBucketConversion, singleAttributeBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator/index.js";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils.js";
export class PyramidChartDescriptor extends BaseChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "PyramidChart",
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
        return (params) => new PluggablePyramidChart(params);
    }
    getMeta() {
        return {
            supportsExport: true,
            supportsZooming: false,
        };
    }
}
//# sourceMappingURL=PyramidChartDescriptor.js.map