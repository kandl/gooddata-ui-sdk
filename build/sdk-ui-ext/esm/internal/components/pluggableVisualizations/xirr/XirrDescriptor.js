import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableXirr } from "./PluggableXirr.js";
import { DASHBOARD_LAYOUT_DEFAULT_KPI_HEIGHT, MAX_VISUALIZATION_HEIGHT } from "../constants.js";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, localeInsightConversion, singleAttributeBucketConversion, singleMeasureBucketConversion, } from "../../../utils/embeddingCodeGenerator/index.js";
export class XirrDescriptor {
    constructor() {
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "Xirr",
                package: "@gooddata/sdk-ui-charts",
            },
            insightToProps: getInsightToPropsConverter({
                measure: singleMeasureBucketConversion("measure", BucketNames.MEASURES),
                attribute: singleAttributeBucketConversion("attribute", BucketNames.ATTRIBUTE),
                filters: filtersInsightConversion("filters"),
                locale: localeInsightConversion("locale"),
                execConfig: executionConfigInsightConversion("execConfig"),
            }),
        });
    }
    getFactory() {
        return (params) => new PluggableXirr(params);
    }
    getSizeInfo(_insight, layoutDescriptor, settings) {
        return {
            width: {
                default: 2,
                min: 2,
                max: layoutDescriptor.gridColumnsCount,
            },
            height: {
                default: this.getDefaultHeight(settings.enableKDWidgetCustomHeight),
                min: this.getMinHeight(settings.enableKDWidgetCustomHeight),
                max: this.getMaxHeight(settings.enableKDWidgetCustomHeight),
            },
        };
    }
    getDefaultHeight(enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_KPI_HEIGHT;
        }
        return 8;
    }
    getMinHeight(enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_KPI_HEIGHT;
        }
        return 6;
    }
    getMaxHeight(enableCustomHeight) {
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
            supportsExport: false,
            supportsZooming: false,
        };
    }
}
//# sourceMappingURL=XirrDescriptor.js.map