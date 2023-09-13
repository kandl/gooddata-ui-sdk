import { insightHasMeasures, } from "@gooddata/sdk-model";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { BaseChart, ColorUtils, updateConfigWithSettings, } from "@gooddata/sdk-ui-charts";
import React from "react";
import compact from "lodash/compact.js";
import { BUCKETS } from "../../../constants/bucket.js";
import { DASHBOARDS_ENVIRONMENT } from "../../../constants/properties.js";
import { BASE_CHART_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties.js";
import { DEFAULT_BASE_CHART_UICONFIG, MAX_CATEGORIES_COUNT } from "../../../constants/uiConfig.js";
import { InvalidBucketsSdkError, } from "../../../interfaces/Visualization.js";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig.js";
import { filterOutDerivedMeasures, getAllAttributeItemsWithPreference, getAttributeItemsWithoutStacks, getFilteredMeasuresForStackedCharts, getMeasureItems, getStackItems, isNotDateBucketItem, sanitizeFilters, } from "../../../utils/bucketHelper.js";
import { getValidProperties } from "../../../utils/colors.js";
import { generateDimensions } from "../../../utils/dimensions.js";
import { getReferencePointWithSupportedProperties, getSupportedPropertiesControls, hasColorMapping, isEmptyObject, getChartSupportedControls, getChartSupportedControlsDashboardsEnv, } from "../../../utils/propertiesHelper.js";
import { createSorts, removeSort, validateCurrentSort } from "../../../utils/sort.js";
import { getTranslation } from "../../../utils/translations.js";
import { setBaseChartUiConfig, setBaseChartUiConfigRecommendations, } from "../../../utils/uiConfigHelpers/baseChartUiConfigHelper.js";
import { isOpenAsReportSupportedByVisualization } from "../../../utils/visualizationsHelper.js";
import BaseChartConfigurationPanel from "../../configurationPanels/BaseChartConfigurationPanel.js";
import { AbstractPluggableVisualization } from "../AbstractPluggableVisualization.js";
import cloneDeep from "lodash/cloneDeep.js";
import isEmpty from "lodash/isEmpty.js";
import set from "lodash/set.js";
import tail from "lodash/tail.js";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown } from "../drillDownUtil.js";
import { messages } from "../../../../locales.js";
export class PluggableBaseChart extends AbstractPluggableVisualization {
    constructor(props) {
        super(props);
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.handlePushData = (data) => {
            const resultingData = data;
            if (data.colors) {
                this.handleConfirmedColorMapping(data);
            }
            else {
                this.pushData(Object.assign(Object.assign({}, resultingData), { references: this.references }));
            }
        };
        this.projectId = props.projectId;
        this.environment = props.environment;
        this.type = VisualizationTypes.COLUMN;
        this.featureFlags = props.featureFlags ? props.featureFlags : {};
        this.ignoreUndoRedo = false;
        this.defaultControlsProperties = {};
        this.setCustomControlsProperties({});
        this.renderFun = props.renderFun;
        this.unmountFun = props.unmountFun;
        this.supportedPropertiesList = this.getSupportedPropertiesList();
    }
    unmount() {
        this.unmountFun([this.getElement(), this.getConfigPanelElement()].filter(Boolean));
    }
    getUiConfig() {
        return cloneDeep(DEFAULT_BASE_CHART_UICONFIG);
    }
    getExtendedReferencePoint(referencePoint) {
        const clonedReferencePoint = cloneDeep(referencePoint);
        const uiConfig = this.getUiConfig();
        let newReferencePoint = Object.assign(Object.assign({}, clonedReferencePoint), { uiConfig });
        this.configureBuckets(newReferencePoint);
        newReferencePoint = configurePercent(newReferencePoint, false);
        newReferencePoint = configureOverTimeComparison(newReferencePoint, !!this.featureFlags["enableWeekFilters"]);
        newReferencePoint = setBaseChartUiConfigRecommendations(newReferencePoint, this.type, !!this.featureFlags["enableWeekFilters"]);
        newReferencePoint = getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList);
        newReferencePoint = setBaseChartUiConfig(newReferencePoint, this.intl, this.type);
        if (!this.featureFlags.enableChartsSorting) {
            newReferencePoint = removeSort(newReferencePoint);
        }
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    getInsightWithDrillDownApplied(source, drillDownContext, backendSupportsElementUris) {
        const intersection = drillDownContext.event.drillContext.intersection;
        const withFilters = addIntersectionFiltersToInsight(source, intersection, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    isOpenAsReportSupported() {
        return isOpenAsReportSupportedByVisualization(this.type);
    }
    setCustomControlsProperties(customControlsProperties) {
        this.customControlsProperties = customControlsProperties;
    }
    getExecution(options, insight, executionFactory) {
        const { dateFormat, executionConfig } = options;
        const supportedControls = this.getSupportedControls(insight, options);
        return executionFactory
            .forInsight(insight)
            .withDimensions(...this.getDimensions(insight))
            .withSorting(...createSorts(this.type, insight, supportedControls, this.featureFlags))
            .withDateFormat(dateFormat)
            .withExecConfig(executionConfig);
    }
    configureBuckets(extendedReferencePoint) {
        var _a, _b, _c, _d, _e;
        const buckets = (_a = extendedReferencePoint === null || extendedReferencePoint === void 0 ? void 0 : extendedReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const categoriesCount = (_e = (_d = (_c = (_b = extendedReferencePoint === null || extendedReferencePoint === void 0 ? void 0 : extendedReferencePoint.uiConfig) === null || _b === void 0 ? void 0 : _b.buckets) === null || _c === void 0 ? void 0 : _c[BucketNames.VIEW]) === null || _d === void 0 ? void 0 : _d.itemsLimit) !== null && _e !== void 0 ? _e : MAX_CATEGORIES_COUNT;
        set(extendedReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: getFilteredMeasuresForStackedCharts(buckets),
            },
            {
                localIdentifier: BucketNames.VIEW,
                items: getAttributeItemsWithoutStacks(buckets).slice(0, categoriesCount),
            },
            {
                localIdentifier: BucketNames.STACK,
                items: this.getStackItems(buckets),
            },
        ]);
    }
    getSupportedPropertiesList() {
        return BASE_CHART_SUPPORTED_PROPERTIES;
    }
    getStackItems(buckets) {
        const measures = getMeasureItems(buckets);
        const masterMeasures = filterOutDerivedMeasures(measures);
        const allAttributes = getAllAttributeItemsWithPreference(buckets, [
            BucketNames.LOCATION,
            BucketNames.VIEW,
            BucketNames.TREND,
            BucketNames.STACK,
            BucketNames.SEGMENT,
        ]);
        let stacks = getStackItems(buckets);
        if (masterMeasures.length <= 1 && allAttributes.length > 1) {
            // first attribute is taken, find next available non-date attribute
            const attributesWithoutFirst = tail(allAttributes);
            const nonDate = attributesWithoutFirst.filter(isNotDateBucketItem);
            stacks = nonDate.slice(0, 1);
        }
        return stacks;
    }
    checkBeforeRender(insight) {
        super.checkBeforeRender(insight);
        if (!insightHasMeasures(insight)) {
            throw new InvalidBucketsSdkError();
        }
        return true;
    }
    renderVisualization(options, insight, executionFactory) {
        const { dimensions = { height: undefined }, custom = {}, locale, theme } = options;
        const { height } = dimensions;
        // keep height undef for AD; causes indigo-visualizations to pick default 100%
        const resultingHeight = this.environment === DASHBOARDS_ENVIRONMENT ? height : undefined;
        const { drillableItems } = custom;
        const supportedControls = this.getSupportedControls(insight, options);
        const configSupportedControls = isEmpty(supportedControls) ? null : supportedControls;
        const fullConfig = this.buildVisualizationConfig(options, configSupportedControls);
        const execution = this.getExecution(options, insight, executionFactory);
        this.renderFun(React.createElement(BaseChart, { execution: execution, afterRender: this.afterRender, drillableItems: drillableItems, onDrill: this.onDrill, onError: this.onError, onExportReady: this.onExportReady, onLoadingChanged: this.onLoadingChanged, pushData: this.handlePushData, height: resultingHeight, type: this.type, locale: locale, config: updateConfigWithSettings(fullConfig, this.featureFlags), LoadingComponent: null, ErrorComponent: null, theme: theme }), this.getElement());
    }
    initializeProperties(visualizationProperties) {
        const controls = visualizationProperties === null || visualizationProperties === void 0 ? void 0 : visualizationProperties.controls;
        const supportedProperties = getSupportedPropertiesControls(controls, this.supportedPropertiesList);
        const initialProperties = {
            supportedProperties: { controls: supportedProperties },
        };
        this.pushData({
            initialProperties,
        });
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(BaseChartConfigurationPanel, { locale: this.locale, references: this.references, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, colors: this.colors, pushData: this.handlePushData, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags, axis: this.axis }), configPanelElement);
        }
    }
    getDimensions(insight) {
        return generateDimensions(insight, this.type);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleConfirmedColorMapping(data) {
        const resultingData = data;
        this.colors = data.colors;
        if (isEmptyObject(this.references)) {
            resultingData.references = {};
        }
        else if (this.references) {
            resultingData.references = this.references;
        }
        if (this.visualizationProperties) {
            resultingData.properties = getValidProperties(this.visualizationProperties, data.colors.colorAssignments);
            this.visualizationProperties = resultingData.properties;
        }
        this.renderConfigurationPanel(this.currentInsight);
        const openAsReportConfig = this.getOpenAsReportConfig(resultingData.properties);
        if (this.ignoreUndoRedo) {
            this.ignoreUndoRedo = false;
            this.pushData(resultingData);
        }
        else {
            this.pushData(Object.assign({ openAsReport: openAsReportConfig, ignoreUndoRedo: true }, resultingData));
        }
    }
    buildVisualizationConfig(options, supportedControls) {
        const { config = {}, customVisualizationConfig = {} } = options;
        const colorMapping = supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.colorMapping;
        const validColorMapping = compact(colorMapping).map((mapItem) => ({
            predicate: ColorUtils.getColorMappingPredicate(mapItem.id),
            color: mapItem.color,
        }));
        return Object.assign(Object.assign(Object.assign({ separators: config.separators, colorPalette: config.colorPalette, forceDisableDrillOnAxes: config.forceDisableDrillOnAxes }, supportedControls), { colorMapping: (validColorMapping === null || validColorMapping === void 0 ? void 0 : validColorMapping.length) > 0 ? validColorMapping : null }), customVisualizationConfig);
    }
    getOpenAsReportConfig(properties) {
        const hasMapping = hasColorMapping(properties);
        const isSupported = this.isOpenAsReportSupported();
        const warningMessage = hasMapping
            ? getTranslation(messages.exportUnsupportedColors.id, this.intl)
            : "";
        return {
            supported: isSupported && !hasMapping,
            warningMessage,
        };
    }
    getSupportedControls(insight, options) {
        var _a, _b;
        const defaultControls = getSupportedPropertiesControls(this.defaultControlsProperties, this.supportedPropertiesList);
        const customControls = getSupportedPropertiesControls(this.customControlsProperties, this.supportedPropertiesList);
        const supportedControls = this.environment === DASHBOARDS_ENVIRONMENT
            ? getChartSupportedControlsDashboardsEnv((_a = this.visualizationProperties) === null || _a === void 0 ? void 0 : _a.controls, options, this.featureFlags)
            : getChartSupportedControls((_b = this.visualizationProperties) === null || _b === void 0 ? void 0 : _b.controls, insight, this.featureFlags);
        return Object.assign(Object.assign(Object.assign({}, defaultControls), supportedControls), customControls);
    }
    isMultipleDatesEnabled() {
        //this is development FF and will be removed in the end of dev cycle
        return !!this.featureFlags["enableMultipleDates"];
    }
    reuseCurrentSort(previousAvailableSorts, properties, availableSorts, defaultSort) {
        const previousSort = properties === null || properties === void 0 ? void 0 : properties.sortItems;
        return validateCurrentSort(previousAvailableSorts, previousSort, availableSorts, defaultSort);
    }
}
//# sourceMappingURL=PluggableBaseChart.js.map