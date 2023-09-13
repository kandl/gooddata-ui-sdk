import { BucketNames } from "@gooddata/sdk-ui";
import { PluggableGeoPushpinChart } from "./PluggableGeoPushpinChart.js";
import { DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT, MIDDLE_VISUALIZATION_HEIGHT } from "../constants.js";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor.js";
import { executionConfigInsightConversion, filtersInsightConversion, getInsightToPropsConverter, getReactEmbeddingCodeGenerator, insightConversion, localeInsightConversion, singleAttributeBucketConversion, singleAttributeOrMeasureBucketConversion, sortsInsightConversion, } from "../../../utils/embeddingCodeGenerator/index.js";
import { geoConfigFromInsight, geoInsightConversion } from "./geoConfigCodeGenerator.js";
import { chartAdditionalFactories } from "../chartCodeGenUtils.js";
export class GeoPushpinChartDescriptor extends BaseChartDescriptor {
    constructor() {
        super(...arguments);
        this.getEmbeddingCode = getReactEmbeddingCodeGenerator({
            component: {
                importType: "named",
                name: "GeoPushpinChart",
                package: "@gooddata/sdk-ui-geo",
            },
            insightToProps: getInsightToPropsConverter({
                location: geoInsightConversion("location", BucketNames.LOCATION),
                latitude: geoInsightConversion("latitude", BucketNames.LATITUDE),
                longitude: geoInsightConversion("longitude", BucketNames.LONGITUDE),
                size: singleAttributeOrMeasureBucketConversion("size", BucketNames.SIZE),
                color: singleAttributeOrMeasureBucketConversion("color", BucketNames.COLOR),
                segmentBy: singleAttributeBucketConversion("segmentBy", BucketNames.SEGMENT),
                filters: filtersInsightConversion("filters"),
                sortBy: sortsInsightConversion("sortBy"),
                config: insightConversion("config", {
                    typeImport: {
                        importType: "named",
                        name: "IGeoConfig",
                        package: "@gooddata/sdk-ui-geo",
                    },
                    cardinality: "scalar",
                }, geoConfigFromInsight),
                locale: localeInsightConversion("locale"),
                execConfig: executionConfigInsightConversion("execConfig"),
            }),
            additionalFactories: chartAdditionalFactories({
                getColorMappingPredicatePackage: "@gooddata/sdk-ui-geo",
            }),
        });
    }
    getFactory() {
        return (params) => new PluggableGeoPushpinChart(params);
    }
    getSizeInfo(_insight, layoutDescriptor, settings) {
        return {
            width: {
                default: 6,
                min: 6,
                max: layoutDescriptor.gridColumnsCount,
            },
            height: {
                default: this.getDefaultHeight(settings.enableKDWidgetCustomHeight),
                min: this.getDefaultHeight(settings.enableKDWidgetCustomHeight),
                max: this.getMaxHeight(settings.enableKDWidgetCustomHeight),
            },
        };
    }
    getMeta() {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/geo_pushpin_chart_component.html",
            supportsExport: true,
            supportsZooming: false,
        };
    }
    getMinHeight(enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT;
        }
        return MIDDLE_VISUALIZATION_HEIGHT;
    }
}
//# sourceMappingURL=GeoPushpinChartDescriptor.js.map