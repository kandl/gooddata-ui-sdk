// (C) 2022-2023 GoodData Corporation
import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableSankeyChart } from "./PluggableSankeyChart.js";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, singleAttributeBucketConversion, singleAttributeOrMeasureBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator/index.js";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils.js";
import { BigChartDescriptor } from "../BigChartDescriptor.js";
export class SankeyChartDescriptor extends BigChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "SankeyChart",
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
        return (params) => new PluggableSankeyChart(params);
    }
    getMeta() {
        return {
            supportsExport: true,
            supportsZooming: false,
        };
    }
}
//# sourceMappingURL=SankeyChartDescriptor.js.map