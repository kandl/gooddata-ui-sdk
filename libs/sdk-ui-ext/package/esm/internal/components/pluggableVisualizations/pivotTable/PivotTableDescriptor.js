// (C) 2021-2022 GoodData Corporation
import { insightSanitize } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import { PluggablePivotTable } from "./PluggablePivotTable";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown, sanitizeTableProperties, } from "../drillDownUtil";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, insightConversion, localeInsightConversion, multipleAttributesBucketConversion, multipleAttributesOrMeasuresBucketConversion, sortsInsightConversion, totalsInsightConversion, } from "../../../utils/embeddingCodeGenerator";
import { pivotTableConfigFromInsight } from "./pivotTableConfigFromInsight";
import { pivotTableAdditionalFactories } from "./pivotTableAdditionalFactories";
export class PivotTableDescriptor extends BaseChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "PivotTable",
                package: "@gooddata/sdk-ui-pivot",
            },
            insightToProps: getInsightToPropsConverter({
                measures: multipleAttributesOrMeasuresBucketConversion("measures", BucketNames.MEASURES),
                rows: multipleAttributesBucketConversion("rows", BucketNames.ATTRIBUTE),
                columns: multipleAttributesBucketConversion("columns", BucketNames.COLUMNS),
                filters: filtersInsightConversion("filters"),
                sortBy: sortsInsightConversion("sortBy"),
                totals: totalsInsightConversion("totals"),
                config: insightConversion("config", {
                    typeImport: {
                        importType: "named",
                        name: "IPivotTableConfig",
                        package: "@gooddata/sdk-ui-pivot",
                    },
                    cardinality: "scalar",
                }, pivotTableConfigFromInsight),
                locale: localeInsightConversion("locale"),
                execConfig: executionConfigInsightConversion("execConfig"),
            }),
            additionalFactories: pivotTableAdditionalFactories,
        });
    }
    getFactory() {
        return (params) => new PluggablePivotTable(params);
    }
    getSizeInfo(_insight, layoutDescriptor, settings) {
        return {
            width: {
                default: layoutDescriptor.gridColumnsCount,
                min: 3,
                max: layoutDescriptor.gridColumnsCount,
            },
            height: {
                default: this.getDefaultHeight(settings.enableKDWidgetCustomHeight),
                min: this.getMinHeight(settings.enableKDWidgetCustomHeight),
                max: this.getMaxHeight(settings.enableKDWidgetCustomHeight),
            },
        };
    }
    applyDrillDown(insight, drillDownContext, backendSupportsElementUris) {
        const drillDownInsight = modifyBucketsAttributesForDrillDown(insight, drillDownContext.drillDefinition);
        const drillDownInsightWithFilters = addIntersectionFiltersToInsight(drillDownInsight, drillDownContext.event.drillContext.intersection, backendSupportsElementUris);
        return sanitizeTableProperties(insightSanitize(drillDownInsightWithFilters));
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/pivot_table_component.html",
            supportsExport: true,
            supportsZooming: false,
        };
    }
}
//# sourceMappingURL=PivotTableDescriptor.js.map