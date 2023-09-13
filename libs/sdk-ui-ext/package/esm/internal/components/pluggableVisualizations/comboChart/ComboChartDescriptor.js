import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableComboChart } from "./PluggableComboChart";
import { BigChartDescriptor } from "../BigChartDescriptor";
import { getReactEmbeddingCodeGenerator, getInsightToPropsConverter, filtersInsightConversion, sortsInsightConversion, multipleMeasuresBucketConversion, multipleAttributesBucketConversion, localeInsightConversion, executionConfigInsightConversion, } from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";
export class ComboChartDescriptor extends BigChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "ComboChart",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                primaryMeasures: multipleMeasuresBucketConversion("primaryMeasures", BucketNames.MEASURES),
                secondaryMeasures: multipleMeasuresBucketConversion("secondaryMeasures", BucketNames.SECONDARY_MEASURES),
                viewBy: multipleAttributesBucketConversion("viewBy", BucketNames.VIEW),
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
        return (params) => new PluggableComboChart(params);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/combo_chart_component.html",
            supportsExport: true,
            supportsZooming: true,
        };
    }
}
//# sourceMappingURL=ComboChartDescriptor.js.map