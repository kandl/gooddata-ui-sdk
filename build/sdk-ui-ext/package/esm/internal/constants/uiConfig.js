import { METRIC, FACT, ATTRIBUTE, DATE, GEO_ATTRIBUTE } from "./bucket";
import { BucketNames, OverTimeComparisonTypes, VisualizationTypes } from "@gooddata/sdk-ui";
export const MAX_METRICS_COUNT = 20;
export const DEFAULT_PIE_METRICS_COUNT = 1;
export const DEFAULT_TREEMAP_MEASURES_COUNT = 1;
export const MAX_FILTERS_COUNT = 20;
export const MAX_CATEGORIES_COUNT = 1;
export const MAX_TABLE_CATEGORIES_COUNT = 20;
export const MAX_STACKS_COUNT = 1;
export const MAX_VIEW_COUNT = 2;
export const DEFAULT_HEADLINE_METRICS_COUNT = 1;
export const DEFAULT_XIRR_METRICS_COUNT = 1;
export const DEFAULT_XIRR_ATTRIBUTES_COUNT = 1;
const DEFAULT_GEO_ATTRIBUTES_COUNT = 1;
const DEFAULT_PUSHPIN_METRICS_COUNT = 1;
export const UICONFIG = "uiConfig";
export const RECOMMENDATIONS = "recommendations";
export const SUPPORTED_COMPARISON_TYPES = "supportedOverTimeComparisonTypes";
export const OPEN_AS_REPORT = "openAsReport";
export const SUPPORTED = "supported";
export const UICONFIG_AXIS = "uiConfig.axis";
export const measuresBase = {
    accepts: [METRIC, FACT, ATTRIBUTE],
    allowsDuplicateItems: true,
    enabled: true,
    allowsReordering: true,
    allowsSwapping: true,
    itemsLimit: MAX_METRICS_COUNT,
    isShowInPercentEnabled: false,
    isShowInPercentVisible: true,
};
export const viewBase = {
    accepts: [ATTRIBUTE, DATE],
    itemsLimit: MAX_CATEGORIES_COUNT,
    itemsLimitByType: {
        date: 1,
    },
    allowsSwapping: true,
    allowsReordering: false,
    enabled: true,
    isShowInPercentEnabled: false,
};
const stackBase = {
    accepts: [ATTRIBUTE],
    itemsLimit: MAX_STACKS_COUNT,
    allowsSwapping: true,
    allowsReordering: false,
    enabled: true,
    isShowInPercentEnabled: false,
};
const stackBaseWithDate = Object.assign(Object.assign({}, stackBase), { accepts: [ATTRIBUTE, DATE] });
export const defaultFilters = {
    filters: {
        accepts: [ATTRIBUTE, DATE],
        itemsLimit: MAX_FILTERS_COUNT,
        itemsLimitByType: {
            date: 1,
        },
        allowsReordering: false,
        enabled: true,
        isShowInPercentEnabled: false,
    },
};
const disabledExportConfig = {
    exportConfig: { supported: false },
};
const enabledExportConfig = {
    exportConfig: { supported: true },
};
const enabledNoMetricConfig = {
    noMetricAccepted: { supported: true },
};
export const disabledOpenAsReportConfig = {
    openAsReport: { supported: false },
};
const enabledOpenAsReportConfig = {
    openAsReport: { supported: true },
};
export const defaultRootUiConfigProperties = Object.assign(Object.assign({ recommendations: {}, supportedOverTimeComparisonTypes: [] }, disabledOpenAsReportConfig), enabledExportConfig);
export const DEFAULT_SCATTERPLOT_UICONFIG = Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { isShowInPercentVisible: false, allowsReordering: false, canAddItems: true, itemsLimit: 1 }), secondary_measures: Object.assign(Object.assign({}, measuresBase), { isShowInPercentVisible: false, allowsReordering: false, canAddItems: true, itemsLimit: 1 }), attribute: Object.assign(Object.assign({}, viewBase), { allowsReordering: false, allowsSwapping: false, canAddItems: true, itemsLimit: MAX_STACKS_COUNT }) }, defaultFilters) }, defaultRootUiConfigProperties);
export const DEFAULT_BUBBLE_CHART_CONFIG = Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { isShowInPercentVisible: false, allowsReordering: false, canAddItems: true, itemsLimit: 1 }), secondary_measures: Object.assign(Object.assign({}, measuresBase), { isShowInPercentVisible: false, allowsReordering: false, canAddItems: true, itemsLimit: 1 }), tertiary_measures: Object.assign(Object.assign({}, measuresBase), { isShowInPercentVisible: false, allowsReordering: false, canAddItems: true, itemsLimit: 1 }), view: Object.assign(Object.assign({}, viewBase), { allowsReordering: false, allowsSwapping: false, canAddItems: true, itemsLimit: 1 }) }, defaultFilters) }, defaultRootUiConfigProperties);
export const DEFAULT_BASE_CHART_UICONFIG = Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign({}, measuresBase), view: Object.assign({}, viewBase), stack: Object.assign({}, stackBase) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig);
export const COLUMN_BAR_CHART_UICONFIG = Object.assign(Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { isShowOnSecondaryAxisVisible: true }), view: Object.assign(Object.assign({}, viewBase), { allowsReordering: true, itemsLimit: MAX_VIEW_COUNT }), stack: Object.assign({}, stackBase) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig), { supportedOverTimeComparisonTypes: [
        OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
        OverTimeComparisonTypes.PREVIOUS_PERIOD,
    ], optionalStacking: {
        supported: true,
        stackMeasures: false,
    } });
export const COLUMN_BAR_CHART_UICONFIG_WITH_MULTIPLE_DATES = Object.assign(Object.assign({}, COLUMN_BAR_CHART_UICONFIG), { buckets: Object.assign(Object.assign({}, COLUMN_BAR_CHART_UICONFIG.buckets), { view: Object.assign(Object.assign({}, COLUMN_BAR_CHART_UICONFIG.buckets.view), { itemsLimitByType: {
                date: 2,
            }, allowsDuplicateDates: true, preferSynchronizedDates: true }), stack: Object.assign(Object.assign({}, stackBaseWithDate), { itemsLimitByType: {
                date: 1,
            }, allowsDuplicateDates: true }) }) });
export const DEFAULT_LINE_UICONFIG = Object.assign(Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { isShowOnSecondaryAxisVisible: true }), trend: Object.assign({}, viewBase), segment: Object.assign({}, stackBase) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig), { supportedOverTimeComparisonTypes: [
        OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
        OverTimeComparisonTypes.PREVIOUS_PERIOD,
    ] });
export const LINE_UICONFIG_WITH_MULTIPLE_DATES = Object.assign(Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { isShowOnSecondaryAxisVisible: true }), trend: Object.assign(Object.assign({}, viewBase), { allowsDuplicateDates: true }), segment: Object.assign(Object.assign({}, stackBaseWithDate), { itemsLimitByType: {
                date: 1,
            }, allowsDuplicateDates: true }) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig), { supportedOverTimeComparisonTypes: [
        OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
        OverTimeComparisonTypes.PREVIOUS_PERIOD,
    ] });
export const DEFAULT_AREA_UICONFIG = Object.assign(Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign({}, measuresBase), view: Object.assign(Object.assign({}, viewBase), { allowsReordering: true, itemsLimit: MAX_VIEW_COUNT }), stack: Object.assign({}, stackBase) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig), { optionalStacking: {
        supported: true,
        stackMeasures: true,
    } });
export const AREA_UICONFIG_WITH_MULTIPLE_DATES = Object.assign(Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign({}, measuresBase), view: Object.assign(Object.assign({}, viewBase), { itemsLimitByType: {
                date: 2,
            }, allowsReordering: true, itemsLimit: MAX_VIEW_COUNT, allowsDuplicateDates: true }), stack: Object.assign(Object.assign({}, stackBaseWithDate), { itemsLimitByType: {
                date: 1,
            }, allowsDuplicateDates: true }) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig), { optionalStacking: {
        supported: true,
        stackMeasures: true,
    } });
export const DEFAULT_PIE_UICONFIG = Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { itemsLimit: DEFAULT_PIE_METRICS_COUNT, allowsReordering: false }), view: Object.assign({}, viewBase) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig);
export const PIE_UICONFIG_WITH_MULTIPLE_METRICS = Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign({}, measuresBase), view: Object.assign(Object.assign({}, viewBase), { itemsLimit: 0 }) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig);
export const PIE_UICONFIG_WITH_ONE_METRIC = Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign({}, measuresBase), view: Object.assign({}, viewBase) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig);
export const DEFAULT_TREEMAP_UICONFIG = Object.assign({ buckets: Object.assign({ measures: Object.assign({}, measuresBase), view: Object.assign({}, viewBase), segment: Object.assign({}, stackBase) }, defaultFilters) }, defaultRootUiConfigProperties);
export const DEFAULT_TABLE_UICONFIG = Object.assign(Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign({}, measuresBase), attribute: Object.assign(Object.assign({}, viewBase), { allowsSwapping: false, allowsReordering: true, itemsLimit: MAX_TABLE_CATEGORIES_COUNT }) }, defaultFilters) }, defaultRootUiConfigProperties), enabledOpenAsReportConfig), { supportedOverTimeComparisonTypes: [
        OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
        OverTimeComparisonTypes.PREVIOUS_PERIOD,
    ] });
export const DEFAULT_HEADLINE_UICONFIG = Object.assign(Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { itemsLimit: DEFAULT_HEADLINE_METRICS_COUNT, isShowInPercentVisible: false, allowsReordering: false }), secondary_measures: Object.assign(Object.assign({}, measuresBase), { itemsLimit: DEFAULT_HEADLINE_METRICS_COUNT, isShowInPercentVisible: false, allowsReordering: false }) }, defaultFilters) }, defaultRootUiConfigProperties), disabledExportConfig), { supportedOverTimeComparisonTypes: [
        OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
        OverTimeComparisonTypes.PREVIOUS_PERIOD,
    ] });
export const DEFAULT_HEATMAP_UICONFIG = Object.assign({ buckets: Object.assign({ measures: {
            accepts: [METRIC, FACT, ATTRIBUTE],
            enabled: true,
            allowsReordering: false,
            allowsSwapping: true,
            itemsLimit: 1,
            isShowInPercentEnabled: false,
            isShowInPercentVisible: false,
            icon: "",
            canAddItems: true,
            allowsDuplicateItems: true,
        }, view: {
            accepts: [ATTRIBUTE, DATE],
            itemsLimit: 1,
            allowsSwapping: true,
            allowsReordering: false,
            enabled: true,
            isShowInPercentEnabled: false,
            icon: "",
            canAddItems: true,
        }, stack: {
            accepts: [ATTRIBUTE, DATE],
            itemsLimit: 1,
            allowsSwapping: true,
            allowsReordering: false,
            enabled: true,
            isShowInPercentEnabled: false,
            icon: "",
            canAddItems: true,
        } }, defaultFilters) }, defaultRootUiConfigProperties);
export const COMBO_CHART_UICONFIG_DEPRECATED = {
    buckets: Object.assign({ measures: Object.assign({}, measuresBase), secondary_measures: Object.assign({}, measuresBase), view: Object.assign(Object.assign({}, viewBase), { itemsLimit: 1 }) }, defaultFilters),
    recommendations: {},
    supportedOverTimeComparisonTypes: [],
};
export const COMBO_CHART_UICONFIG = Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { canAddItems: true, allowSelectChartType: true, allowOptionalStacking: true }), secondary_measures: Object.assign(Object.assign({}, measuresBase), { canAddItems: true, allowSelectChartType: true, allowShowOnSecondaryAxis: true }), view: Object.assign(Object.assign({}, viewBase), { canAddItems: true, itemsLimit: 1 }) }, defaultFilters) }, defaultRootUiConfigProperties), { supportedOverTimeComparisonTypes: [
        OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
        OverTimeComparisonTypes.PREVIOUS_PERIOD,
    ], supportedChartTypes: [VisualizationTypes.COLUMN, VisualizationTypes.LINE, VisualizationTypes.AREA], optionalStacking: {
        supported: true,
        disabled: false,
        stackMeasures: false,
    } });
export const DEFAULT_XIRR_UICONFIG = Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), { accepts: [METRIC, FACT], itemsLimit: DEFAULT_XIRR_METRICS_COUNT, isShowInPercentVisible: false }), attribute: Object.assign(Object.assign({}, viewBase), { accepts: [DATE], itemsLimit: DEFAULT_XIRR_ATTRIBUTES_COUNT }) }, defaultFilters) }, defaultRootUiConfigProperties), disabledExportConfig);
export const DEFAULT_BULLET_CHART_CONFIG = Object.assign(Object.assign({ buckets: Object.assign({ [BucketNames.MEASURES]: Object.assign(Object.assign({}, measuresBase), { isShowOnSecondaryAxisVisible: false, isShowInPercentVisible: false, allowsReordering: false, canAddItems: true, itemsLimit: 1 }), [BucketNames.SECONDARY_MEASURES]: Object.assign(Object.assign({}, measuresBase), { isShowOnSecondaryAxisVisible: false, isShowInPercentVisible: false, allowsReordering: false, canAddItems: true, itemsLimit: 1 }), [BucketNames.TERTIARY_MEASURES]: Object.assign(Object.assign({}, measuresBase), { isShowOnSecondaryAxisVisible: false, isShowInPercentVisible: false, allowsReordering: false, canAddItems: true, itemsLimit: 1 }), [BucketNames.VIEW]: Object.assign(Object.assign({}, viewBase), { allowsReordering: true, allowsSwapping: true, canAddItems: true, itemsLimit: 2 }) }, defaultFilters) }, defaultRootUiConfigProperties), { supportedOverTimeComparisonTypes: [
        OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
        OverTimeComparisonTypes.PREVIOUS_PERIOD,
    ] });
export const BULLET_CHART_CONFIG_MULTIPLE_DATES = Object.assign(Object.assign({}, defaultRootUiConfigProperties), { buckets: Object.assign({ [BucketNames.MEASURES]: Object.assign({}, DEFAULT_BULLET_CHART_CONFIG.buckets[BucketNames.MEASURES]), [BucketNames.SECONDARY_MEASURES]: Object.assign({}, DEFAULT_BULLET_CHART_CONFIG.buckets[BucketNames.SECONDARY_MEASURES]), [BucketNames.TERTIARY_MEASURES]: Object.assign({}, DEFAULT_BULLET_CHART_CONFIG.buckets[BucketNames.TERTIARY_MEASURES]), [BucketNames.VIEW]: Object.assign(Object.assign({}, viewBase), { allowsReordering: true, allowsSwapping: true, canAddItems: true, itemsLimit: 2, itemsLimitByType: {
                date: 2,
            }, allowsDuplicateDates: true, preferSynchronizedDates: true }) }, defaultFilters), supportedOverTimeComparisonTypes: [
        OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
        OverTimeComparisonTypes.PREVIOUS_PERIOD,
    ] });
const geoMeasuresBase = Object.assign(Object.assign({}, measuresBase), { allowsReordering: false, itemsLimit: DEFAULT_PUSHPIN_METRICS_COUNT, isShowInPercentVisible: false, canAddItems: true });
const geoAttributesBase = Object.assign(Object.assign({}, viewBase), { accepts: [ATTRIBUTE], canAddItems: true, itemsLimit: DEFAULT_GEO_ATTRIBUTES_COUNT });
export const GEO_PUSHPIN_CHART_UICONFIG = Object.assign(Object.assign({ buckets: Object.assign({ location: Object.assign(Object.assign({}, geoAttributesBase), { accepts: [ATTRIBUTE, GEO_ATTRIBUTE] }), size: Object.assign({}, geoMeasuresBase), color: Object.assign({}, geoMeasuresBase), segment: Object.assign({}, geoAttributesBase) }, defaultFilters), supportedLocationIcon: { supported: true } }, defaultRootUiConfigProperties), enabledNoMetricConfig);
export function getTreemapUiConfig(allowsMultipleDates, hasNonStackAttributes, hasMultipleMeasures) {
    const measuresConfig = hasNonStackAttributes
        ? {
            itemsLimit: DEFAULT_TREEMAP_MEASURES_COUNT,
            allowsReordering: false,
            canAddItems: false,
            isShowInPercentEnabled: true,
        }
        : {};
    const viewsConfig = !hasNonStackAttributes && hasMultipleMeasures
        ? {
            itemsLimit: 0,
        }
        : {};
    const multipleDatesConfig = allowsMultipleDates
        ? {
            itemsLimitByType: {
                date: 1,
            },
            allowsDuplicateDates: true,
        }
        : {};
    const segmentBase = allowsMultipleDates ? stackBaseWithDate : stackBase;
    return Object.assign({ buckets: Object.assign({ measures: Object.assign(Object.assign({}, measuresBase), measuresConfig), view: Object.assign(Object.assign(Object.assign({}, viewBase), viewsConfig), multipleDatesConfig), segment: Object.assign(Object.assign({}, segmentBase), multipleDatesConfig) }, defaultFilters) }, defaultRootUiConfigProperties);
}
//# sourceMappingURL=uiConfig.js.map