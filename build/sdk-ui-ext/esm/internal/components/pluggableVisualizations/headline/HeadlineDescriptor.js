import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableHeadline } from "./PluggableHeadline.js";
import { DASHBOARD_LAYOUT_DEFAULT_KPI_HEIGHT, MAX_VISUALIZATION_HEIGHT } from "../constants.js";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, singleMeasureBucketConversion, localeInsightConversion, insightConversion, } from "../../../utils/embeddingCodeGenerator/index.js";
import { headlineConfigFromInsight } from "./headlineConfigFromInsight.js";
import { singleSecondaryMeasureBucketConversion, multipleSecondaryMeasuresBucketConversion, } from "./headlineBucketConversion.js";
const hasSecondaryMeasure = (insight) => insight.insight.buckets.filter((bucket) => bucket.items.length > 0).length > 1;
export class HeadlineDescriptor {
    constructor() {
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "Headline",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                primaryMeasure: singleMeasureBucketConversion("primaryMeasure", BucketNames.MEASURES),
                secondaryMeasures: multipleSecondaryMeasuresBucketConversion("secondaryMeasures", BucketNames.SECONDARY_MEASURES),
                secondaryMeasure: singleSecondaryMeasureBucketConversion("secondaryMeasure", BucketNames.SECONDARY_MEASURES),
                filters: filtersInsightConversion("filters"),
                locale: localeInsightConversion("locale"),
                execConfig: executionConfigInsightConversion("execConfig"),
                config: insightConversion("config", {
                    typeImport: {
                        importType: "named",
                        name: "IChartConfig",
                        package: "@gooddata/sdk-ui-charts",
                    },
                    cardinality: "scalar",
                }, headlineConfigFromInsight),
            }),
        });
    }
    getFactory() {
        return (params) => new PluggableHeadline(params);
    }
    getSizeInfo(insight, layoutDescriptor, settings) {
        return {
            width: {
                default: 2,
                min: 2,
                max: layoutDescriptor.gridColumnsCount,
            },
            height: {
                default: this.getDefaultHeight(insight, settings.enableKDWidgetCustomHeight),
                min: this.getMinHeight(insight, settings.enableKDWidgetCustomHeight),
                max: this.getMaxHeight(insight, settings.enableKDWidgetCustomHeight),
            },
        };
    }
    getDefaultHeight(insight, enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_KPI_HEIGHT;
        }
        return hasSecondaryMeasure(insight) ? 11 : 8;
    }
    getMinHeight(insight, enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_KPI_HEIGHT;
        }
        return hasSecondaryMeasure(insight) ? 10 : 6;
    }
    getMaxHeight(_insight, enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_KPI_HEIGHT;
        }
        return MAX_VISUALIZATION_HEIGHT;
    }
    applyDrillDown(insight) {
        return insight;
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/headline_component.html",
            supportsExport: false,
            supportsZooming: false,
        };
    }
}
//# sourceMappingURL=HeadlineDescriptor.js.map