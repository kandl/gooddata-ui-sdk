// (C) 2021-2022 GoodData Corporation
import { bucketIsEmpty, insightBucket } from "@gooddata/sdk-model";
import { BucketNames, getIntersectionPartAfter, } from "@gooddata/sdk-ui";
import { arrayUtils } from "@gooddata/util";
import { PluggableColumnChart } from "./PluggableColumnChart";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown } from "../drillDownUtil";
import { drillDownFromAttributeLocalId } from "../../../utils/ImplicitDrillDownHelper";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, multipleAttributesBucketConversion, multipleAttributesOrMeasuresBucketConversion, singleAttributeBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";
export class ColumnChartDescriptor extends BaseChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "ColumnChart",
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
        return (params) => new PluggableColumnChart(params);
    }
    applyDrillDown(insight, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFiltersForColumnBar(insight, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/column_chart_component.html",
            supportsExport: true,
            supportsZooming: true,
        };
    }
    adjustIntersectionForColumnBar(insight, event) {
        const stackBucket = insightBucket(insight, BucketNames.STACK);
        const hasStackByAttributes = stackBucket && !bucketIsEmpty(stackBucket);
        const intersection = event.drillContext.intersection;
        return hasStackByAttributes ? arrayUtils.shiftArrayRight(intersection) : intersection;
    }
    addFiltersForColumnBar(insight, drillConfig, event, backendSupportsElementUris) {
        const clicked = drillDownFromAttributeLocalId(drillConfig);
        const reorderedIntersection = this.adjustIntersectionForColumnBar(insight, event);
        const cutIntersection = getIntersectionPartAfter(reorderedIntersection, clicked);
        return addIntersectionFiltersToInsight(insight, cutIntersection, backendSupportsElementUris);
    }
}
//# sourceMappingURL=ColumnChartDescriptor.js.map