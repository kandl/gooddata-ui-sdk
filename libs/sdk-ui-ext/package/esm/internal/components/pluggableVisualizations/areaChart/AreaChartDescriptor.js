import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableAreaChart } from "./PluggableAreaChart";
import { BigChartDescriptor } from "../BigChartDescriptor";
import { modifyBucketsAttributesForDrillDown, reverseAndTrimIntersection, addIntersectionFiltersToInsight, } from "../drillDownUtil";
import { filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, multipleAttributesBucketConversion, multipleAttributesOrMeasuresBucketConversion, singleAttributeBucketConversion, sortsInsightConversion, localeInsightConversion, executionConfigInsightConversion, } from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";
export class AreaChartDescriptor extends BigChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "AreaChart",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                measures: multipleAttributesOrMeasuresBucketConversion("measures", BucketNames.MEASURES),
                viewBy: multipleAttributesBucketConversion("viewBy", BucketNames.VIEW),
                stackBy: singleAttributeBucketConversion("stackBy", BucketNames.STACK),
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
        return (params) => new PluggableAreaChart(params);
    }
    applyDrillDown(insight, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFilters(insight, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/area_chart_component.html",
            supportsExport: true,
            supportsZooming: true,
        };
    }
    addFilters(source, drillConfig, event, backendSupportsElementUris) {
        const cutIntersection = reverseAndTrimIntersection(drillConfig, event.drillContext.intersection);
        return addIntersectionFiltersToInsight(source, cutIntersection, backendSupportsElementUris);
    }
}
//# sourceMappingURL=AreaChartDescriptor.js.map