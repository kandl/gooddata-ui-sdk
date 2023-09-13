import { BucketNames, getIntersectionPartAfter } from "@gooddata/sdk-ui";
import { PluggableBulletChart } from "./PluggableBulletChart";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor";
import { modifyBucketsAttributesForDrillDown, addIntersectionFiltersToInsight } from "../drillDownUtil";
import { drillDownFromAttributeLocalId } from "../../../utils/ImplicitDrillDownHelper";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, multipleAttributesBucketConversion, singleAttributeOrMeasureBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";
export class BulletChartDescriptor extends BaseChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "BulletChart",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                primaryMeasure: singleAttributeOrMeasureBucketConversion("primaryMeasure", BucketNames.MEASURES),
                targetMeasure: singleAttributeOrMeasureBucketConversion("targetMeasure", BucketNames.SECONDARY_MEASURES),
                comparativeMeasure: singleAttributeOrMeasureBucketConversion("comparativeMeasure", BucketNames.TERTIARY_MEASURES),
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
        return (params) => new PluggableBulletChart(params);
    }
    applyDrillDown(insight, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFiltersForBullet(insight, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/bullet_chart_component.html",
            supportsExport: true,
            supportsZooming: true,
        };
    }
    addFiltersForBullet(insight, drillConfig, event, backendSupportsElementUris) {
        const clicked = drillDownFromAttributeLocalId(drillConfig);
        const cutIntersection = getIntersectionPartAfter(event.drillContext.intersection, clicked);
        return addIntersectionFiltersToInsight(insight, cutIntersection, backendSupportsElementUris);
    }
}
//# sourceMappingURL=BulletChartDescriptor.js.map