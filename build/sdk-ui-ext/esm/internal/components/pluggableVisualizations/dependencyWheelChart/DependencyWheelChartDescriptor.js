// (C) 2023 GoodData Corporation
import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableDependencyWheelChart } from "./PluggableDependencyWheelChart.js";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, singleAttributeBucketConversion, singleAttributeOrMeasureBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator/index.js";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils.js";
import { SankeyChartDescriptor } from "../sankeyChart/SankeyChartDescriptor.js";
export class DependencyWheelChartDescriptor extends SankeyChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "DependencyWheelChart",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                measure: singleAttributeOrMeasureBucketConversion("measure", BucketNames.MEASURES),
                attributeFrom: singleAttributeBucketConversion("attributeFrom", BucketNames.ATTRIBUTE_FROM),
                attributeTo: singleAttributeBucketConversion("attributeTo", BucketNames.ATTRIBUTE_TO),
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
        return (params) => new PluggableDependencyWheelChart(params);
    }
}
//# sourceMappingURL=DependencyWheelChartDescriptor.js.map