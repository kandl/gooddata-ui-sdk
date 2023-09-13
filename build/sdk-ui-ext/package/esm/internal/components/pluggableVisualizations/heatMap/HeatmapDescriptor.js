import { BucketNames, isDrillIntersectionAttributeItem } from "@gooddata/sdk-ui";
import { PluggableHeatmap } from "./PluggableHeatmap";
import { BigChartDescriptor } from "../BigChartDescriptor";
import { drillDownFromAttributeLocalId } from "../../../utils/ImplicitDrillDownHelper";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown } from "../drillDownUtil";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, singleAttributeBucketConversion, singleAttributeOrMeasureBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";
export class HeatmapDescriptor extends BigChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "Heatmap",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                measure: singleAttributeOrMeasureBucketConversion("measure", BucketNames.MEASURES),
                rows: singleAttributeBucketConversion("rows", BucketNames.VIEW),
                columns: singleAttributeBucketConversion("columns", BucketNames.STACK),
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
        return (params) => new PluggableHeatmap(params);
    }
    applyDrillDown(insight, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFilters(insight, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/heatmap_component.html",
            supportsExport: true,
            supportsZooming: true,
        };
    }
    addFilters(source, drillConfig, event, backendSupportsElementUris) {
        const clicked = drillDownFromAttributeLocalId(drillConfig);
        const cutIntersection = (event.drillContext.intersection || []).filter((i) => isDrillIntersectionAttributeItem(i.header) &&
            i.header.attributeHeader.localIdentifier === clicked);
        return addIntersectionFiltersToInsight(source, cutIntersection, backendSupportsElementUris);
    }
}
//# sourceMappingURL=HeatmapDescriptor.js.map