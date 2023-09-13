import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableTreemap } from "./PluggableTreemap";
import { BigChartDescriptor } from "../BigChartDescriptor";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown, reverseAndTrimIntersection, } from "../drillDownUtil";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, multipleAttributesOrMeasuresBucketConversion, singleAttributeBucketConversion, } from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";
export class TreemapDescriptor extends BigChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "Treemap",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                measures: multipleAttributesOrMeasuresBucketConversion("measures", BucketNames.MEASURES),
                viewBy: singleAttributeBucketConversion("viewBy", BucketNames.VIEW),
                segmentBy: singleAttributeBucketConversion("segmentBy", BucketNames.SEGMENT),
                filters: filtersInsightConversion("filters"),
                config: chartConfigInsightConversion("config"),
                locale: localeInsightConversion("locale"),
                execConfig: executionConfigInsightConversion("execConfig"),
            }),
            additionalFactories: chartAdditionalFactories(),
        });
    }
    getFactory() {
        return (params) => new PluggableTreemap(params);
    }
    applyDrillDown(source, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFilters(source, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/treemap_component.html",
            supportsExport: true,
            supportsZooming: true,
        };
    }
    addFilters(source, drillConfig, event, backendSupportsElementUris) {
        const cutIntersection = reverseAndTrimIntersection(drillConfig, event.drillContext.intersection);
        return addIntersectionFiltersToInsight(source, cutIntersection, backendSupportsElementUris);
    }
}
//# sourceMappingURL=TreemapDescriptor.js.map