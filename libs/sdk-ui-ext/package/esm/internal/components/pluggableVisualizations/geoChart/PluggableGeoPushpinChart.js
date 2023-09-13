// (C) 2019-2023 GoodData Corporation
import React from "react";
import { EmptyAfmSdkError, } from "../../../interfaces/Visualization";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart";
import { ATTRIBUTE, BUCKETS, METRIC } from "../../../constants/bucket";
import { GEO_PUSHPIN_CHART_UICONFIG } from "../../../constants/uiConfig";
import { getAttributeItemsWithoutStacks, getItemsCount, getItemsFromBuckets, getAllMeasures, getPreferredBucketItems, isDateBucketItem, limitNumberOfMeasuresInBuckets, removeAllArithmeticMeasuresFromDerived, removeAllDerivedMeasures, removeShowOnSecondaryAxis, } from "../../../utils/bucketHelper";
import { setGeoPushpinUiConfig } from "../../../utils/uiConfigHelpers/geoPushpinChartUiConfigHelper";
import { DASHBOARDS_ENVIRONMENT, ANALYTICAL_ENVIRONMENT } from "../../../constants/properties";
import { GEOPUSHPIN_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties";
import GeoPushpinConfigurationPanel from "../../configurationPanels/GeoPushpinConfigurationPanel";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { attributeAlias, attributeDisplayFormRef, bucketAttribute, idRef, insightBucket, insightBuckets, insightFilters, insightHasDataDefined, isUriRef, newAttribute, newAttributeSort, newBucket, uriRef, attributeLocalId, } from "@gooddata/sdk-model";
import { CoreGeoChart, getGeoChartDimensions } from "@gooddata/sdk-ui-geo";
import set from "lodash/set";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";
import cloneDeep from "lodash/cloneDeep";
import { configurePercent } from "../../../utils/bucketConfig";
import { removeSort } from "../../../utils/sort";
const NUMBER_MEASURES_IN_BUCKETS_LIMIT = 2;
/**
 * PluggableGeoPushpinChart
 *
 * ## Buckets
 *
 * | Name        | Id          | Accepts                                                       |
 * |-------------|-------------|---------------------------------------------------------------|
 * | Location    | location    | geo attributes only                                           |
 * | Latitude    | latitude    | geo attributes only, added internally, not accessible from UI |
 * | Longitude   | longitude   | geo attributes only, added internally, not accessible from UI |
 * | Size        | size        | measures only                                                 |
 * | Color       | color       | measures only                                                 |
 * | Segment     | segment     | attributes only                                               |
 * | TooltipText | tooltipText | attributes only, added internally, not accessible from UI     |
 *
 * Internal buckets are used only for execution, they never exist in reference point.
 * In ref. point they are represented by items in properties
 *
 * ### Bucket axioms
 *
 * - |Location| = 1
 * - |Size| ≤ 1
 * - |Color| ≤ 1
 * - |Segment| ≤ 1
 *
 * ## Dimensions
 *
 * The PluggableGeoPushpinChart creates either one- or two-dimensional execution.
 *
 * In the case when latitude and longitude is in the one string label, delimited by ";":
 * - |Size| + |Color| ≥ 1 ⇒ [[MeasureGroupIdentifier], [Location, Segment, TooltipText]]
 * - |Size| + |Color| = 0 ⇒ [[Location, Segment, TooltipText]]
 *
 * In the case when latitude and longitude is in two numerical separate labels:
 * - |Size| + |Color| ≥ 1 ⇒ [[MeasureGroupIdentifier], [Latitude, Longitude, Segment, TooltipText]]
 * - |Size| + |Color| = 0 ⇒ [[Latitude, Longitude, Segment, TooltipText]]
 *
 * ## Sorts
 *
 * Unless the user specifies otherwise, the sorts used by default are:
 *
 * - |Segment| ≥ 1 ⇒ [attributeSort(Segment[0])]
 */
export class PluggableGeoPushpinChart extends PluggableBaseChart {
    constructor(props) {
        super(props);
        // This is effectively calling super.handlePushData()
        // https://stackoverflow.com/questions/31088947/inheritance-method-call-triggers-typescript-compiler-error
        // https://github.com/basarat/typescript-book/blob/master/docs/arrow-functions.md#tip-arrow-functions-and-inheritance
        this.superHandlePushData = this.handlePushData;
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.handlePushData = (data) => {
            // For pushpin chart we do not support drilling from attributes.
            this.superHandlePushData(Object.assign(Object.assign({}, data), (data.availableDrillTargets && {
                availableDrillTargets: this.withEmptyAttributeTargets(data),
            })));
        };
        this.type = VisualizationTypes.PUSHPIN;
        this.initializeProperties(props.visualizationProperties);
        this.backendCapabilities = props.backend.capabilities;
    }
    checkBeforeRender(insight) {
        if (!insightHasDataDefined(insight)) {
            throw new EmptyAfmSdkError();
        }
        return true;
    }
    getExtendedReferencePoint(referencePoint) {
        return super
            .getExtendedReferencePoint(referencePoint)
            .then((extendedReferencePoint) => {
            let newReferencePoint = setGeoPushpinUiConfig(extendedReferencePoint, this.intl, this.type);
            newReferencePoint = configurePercent(newReferencePoint, true);
            newReferencePoint = removeSort(newReferencePoint);
            return this.updateSupportedProperties(newReferencePoint);
        });
    }
    getUiConfig() {
        return cloneDeep(GEO_PUSHPIN_CHART_UICONFIG);
    }
    getExecution(options, insight, executionFactory) {
        const { executionConfig } = options;
        const buckets = this.prepareBuckets(insight);
        return executionFactory
            .forBuckets(buckets, insightFilters(insight))
            .withDimensions(getGeoChartDimensions)
            .withSorting(...this.createSort(insight))
            .withExecConfig(executionConfig);
    }
    getSupportedPropertiesList() {
        return GEOPUSHPIN_SUPPORTED_PROPERTIES;
    }
    configureBuckets(extendedReferencePoint) {
        const newExtendedReferencePoint = this.sanitizeMeasures(extendedReferencePoint);
        const buckets = limitNumberOfMeasuresInBuckets(newExtendedReferencePoint.buckets, NUMBER_MEASURES_IN_BUCKETS_LIMIT);
        const allMeasures = getAllMeasures(buckets);
        const primaryMeasures = getPreferredBucketItems(buckets, [BucketNames.MEASURES, BucketNames.SIZE], [METRIC]);
        const secondaryMeasures = getPreferredBucketItems(buckets, [BucketNames.SECONDARY_MEASURES, BucketNames.COLOR], [METRIC]);
        const sizeMeasures = (primaryMeasures.length > 0
            ? primaryMeasures
            : allMeasures.filter((measure) => !includes(secondaryMeasures, measure))).slice(0, this.getPreferredBucketItemLimit(BucketNames.SIZE));
        const colorMeasures = (secondaryMeasures.length > 0
            ? secondaryMeasures
            : allMeasures.filter((measure) => !includes(sizeMeasures, measure))).slice(0, this.getPreferredBucketItemLimit(BucketNames.COLOR));
        set(newExtendedReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.LOCATION,
                items: this.getLocationItems(buckets),
            },
            {
                localIdentifier: BucketNames.SIZE,
                items: removeShowOnSecondaryAxis(sizeMeasures),
            },
            {
                localIdentifier: BucketNames.COLOR,
                items: removeShowOnSecondaryAxis(colorMeasures),
            },
            {
                localIdentifier: BucketNames.SEGMENT,
                items: this.getSegmentItems(buckets),
            },
        ]);
        return newExtendedReferencePoint;
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        // NOTE: using pushData directly; no handlePushData here as in other visualizations.
        if (configPanelElement) {
            this.renderFun(React.createElement(GeoPushpinConfigurationPanel, { locale: this.locale, pushData: this.pushData, properties: this.visualizationProperties, references: this.references, propertiesMeta: this.propertiesMeta, insight: insight, colors: this.colors, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags }), configPanelElement);
        }
    }
    buildVisualizationConfig(options, supportedControls) {
        const { config = {}, customVisualizationConfig = {} } = options;
        const { center, legend, viewport = {} } = supportedControls;
        const { colorMapping } = super.buildVisualizationConfig(options, supportedControls);
        const centerProp = center ? { center } : {};
        const legendProp = legend ? { legend } : {};
        const { isInEditMode, isExportMode } = config;
        if (this.environment === DASHBOARDS_ENVIRONMENT && this.featureFlags["enableKDWidgetCustomHeight"]) {
            set(supportedControls, "legend.responsive", "autoPositionWithPopup");
        }
        const viewportProp = {
            viewport: Object.assign(Object.assign({}, viewport), { frozen: isInEditMode || isExportMode }),
        };
        const geoChartConfig = Object.assign(Object.assign(Object.assign(Object.assign({}, config), centerProp), legendProp), viewportProp);
        const isKDInViewMode = this.environment !== ANALYTICAL_ENVIRONMENT && !isInEditMode;
        const cooperativeGestures = (customVisualizationConfig === null || customVisualizationConfig === void 0 ? void 0 : customVisualizationConfig.cooperativeGestures) !== undefined
            ? customVisualizationConfig.cooperativeGestures
            : isKDInViewMode;
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ separators: config.separators, colorPalette: config.colorPalette, mapboxToken: config.mapboxToken }, supportedControls), geoChartConfig), { colorMapping }), customVisualizationConfig), { cooperativeGestures });
    }
    renderVisualization(options, insight, executionFactory) {
        const { dimensions = { height: undefined }, custom = {}, locale, theme } = options;
        const { height } = dimensions;
        const { intl } = this;
        // keep height undef for AD; causes indigo-visualizations to pick default 100%
        const resultingHeight = this.environment === DASHBOARDS_ENVIRONMENT ? height : undefined;
        const { drillableItems } = custom;
        const supportedControls = this.visualizationProperties.controls || {};
        const fullConfig = this.buildVisualizationConfig(options, supportedControls);
        const execution = this.getExecution(options, insight, executionFactory);
        const geoPushpinProps = {
            drillableItems,
            config: fullConfig,
            height: resultingHeight,
            intl,
            locale,
            execution,
            pushData: this.handlePushData,
            afterRender: this.afterRender,
            onDrill: this.onDrill,
            onError: this.onError,
            onExportReady: this.onExportReady,
            onLoadingChanged: this.onLoadingChanged,
            LoadingComponent: null,
            ErrorComponent: null,
            theme,
        };
        this.renderFun(React.createElement(CoreGeoChart, Object.assign({}, geoPushpinProps)), this.getElement());
    }
    withEmptyAttributeTargets(data) {
        return Object.assign(Object.assign({}, data.availableDrillTargets), { attributes: [] });
    }
    sanitizeMeasures(extendedReferencePoint) {
        const newExtendedReferencePoint = removeAllArithmeticMeasuresFromDerived(extendedReferencePoint);
        return removeAllDerivedMeasures(newExtendedReferencePoint);
    }
    createSort(insight) {
        const bucket = insightBucket(insight, BucketNames.SEGMENT);
        const segmentAttribute = bucket && bucketAttribute(bucket);
        // sort by second attribute (1st: location, 2nd: segmentBy, 3rd: tooltipText)
        if (segmentAttribute) {
            return [newAttributeSort(segmentAttribute, "asc")];
        }
        return [];
    }
    getSegmentItems(buckets) {
        let segments = getPreferredBucketItems(buckets, [BucketNames.STACK, BucketNames.SEGMENT, BucketNames.COLUMNS], [ATTRIBUTE]);
        const nonSegmentAttributes = getAttributeItemsWithoutStacks(buckets);
        if (nonSegmentAttributes.length > 1 && isEmpty(segments)) {
            const locationItems = this.getLocationItems(buckets);
            segments = nonSegmentAttributes
                .filter((attribute) => !includes(locationItems, attribute))
                .filter((attribute) => !isDateBucketItem(attribute))
                .slice(0, 1);
        }
        return segments.slice(0, this.getPreferredBucketItemLimit(BucketNames.SEGMENT));
    }
    getLocationItems(buckets) {
        const locationItems = getItemsFromBuckets(buckets, [BucketNames.ATTRIBUTE, BucketNames.VIEW, BucketNames.LOCATION, BucketNames.TREND], [ATTRIBUTE]).filter((bucketItem) => Boolean(bucketItem.locationDisplayFormRef));
        return locationItems.slice(0, this.getPreferredBucketItemLimit(BucketNames.LOCATION));
    }
    getPreferredBucketItemLimit(preferredBucket) {
        const { buckets: bucketsUiConfig } = this.getUiConfig();
        return bucketsUiConfig[preferredBucket].itemsLimit;
    }
    updateSupportedProperties(referencePoint) {
        var _a;
        const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const locationItem = this.getLocationItems(buckets)[0];
        if (!locationItem) {
            return referencePoint;
        }
        const referencePointConfigured = cloneDeep(referencePoint);
        const visualizationProperties = this.visualizationProperties || {};
        const { controls = {} } = visualizationProperties;
        const hasSizeMeasure = getItemsCount(buckets, BucketNames.SIZE) > 0;
        const hasColorMeasure = getItemsCount(buckets, BucketNames.COLOR) > 0;
        const hasLocationAttribute = getItemsCount(buckets, BucketNames.LOCATION) > 0;
        const hasSegmentAttribute = getItemsCount(buckets, BucketNames.SEGMENT) > 0;
        const groupNearbyPoints = hasLocationAttribute && !hasColorMeasure && !hasSizeMeasure && !hasSegmentAttribute;
        const locationProperties = this.getLocationProperties(locationItem);
        set(referencePointConfigured, "properties", {
            controls: Object.assign(Object.assign({ points: {
                    groupNearbyPoints,
                } }, controls), locationProperties),
        });
        if (this.references) {
            set(referencePointConfigured, "references", this.references);
        }
        return referencePointConfigured;
    }
    getLocationProperties(locationItem) {
        var _a, _b, _c, _d, _e, _f;
        const { dfRef } = locationItem;
        // for tooltip, prefer standard text display form (whose type is `undefined`) over geo or hyperlink display forms
        const textDfs = (_b = (_a = locationItem.displayForms) === null || _a === void 0 ? void 0 : _a.filter((displayForm) => !displayForm.type)) !== null && _b !== void 0 ? _b : [];
        const defaultOrFirstTextDf = textDfs.find((displayForm) => !!displayForm.isDefault) || textDfs[0];
        const tooltipDfRef = (defaultOrFirstTextDf === null || defaultOrFirstTextDf === void 0 ? void 0 : defaultOrFirstTextDf.ref) || dfRef;
        const tooltipText = isUriRef(tooltipDfRef) ? tooltipDfRef.uri : tooltipDfRef.identifier;
        if (this.backendCapabilities.supportsSeparateLatitudeLongitudeLabels) {
            const latitudeDfRef = (_d = (_c = locationItem.displayForms) === null || _c === void 0 ? void 0 : _c.find((displayForm) => displayForm.type === "GDC.geo.pin_latitude")) === null || _d === void 0 ? void 0 : _d.ref;
            const longitudeDfRef = (_f = (_e = locationItem.displayForms) === null || _e === void 0 ? void 0 : _e.find((displayForm) => displayForm.type === "GDC.geo.pin_longitude")) === null || _f === void 0 ? void 0 : _f.ref;
            const latitude = isUriRef(latitudeDfRef) ? latitudeDfRef === null || latitudeDfRef === void 0 ? void 0 : latitudeDfRef.uri : latitudeDfRef === null || latitudeDfRef === void 0 ? void 0 : latitudeDfRef.identifier;
            const longitude = isUriRef(longitudeDfRef) ? longitudeDfRef === null || longitudeDfRef === void 0 ? void 0 : longitudeDfRef.uri : longitudeDfRef === null || longitudeDfRef === void 0 ? void 0 : longitudeDfRef.identifier;
            return {
                tooltipText,
                latitude,
                longitude,
            };
        }
        return {
            tooltipText,
        };
    }
    prepareBuckets(insight) {
        var _a;
        const supportedControls = ((_a = this.visualizationProperties) === null || _a === void 0 ? void 0 : _a.controls) || {};
        // we need to shallow copy the buckets so that we can add more without mutating the original array
        const buckets = [...insightBuckets(insight)];
        if (supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.tooltipText) {
            /*
             * The display form to use for tooltip text is provided in properties :( This is unfortunate; the chart
             * props could very well contain an extra prop for the tooltip bucket.
             *
             * Current guess is that this is because AD creates insight buckets; in order to create the tooltip
             * bucket, AD would have to actually show the tooltip bucket in the UI - which is not desired. Thus the
             * displayForm to add as bucket is passed in visualization properties.
             *
             * This workaround is highly unfortunate for two reasons:
             *
             * 1.  It leaks all the way to the API of geo chart: bucket geo does not have the tooltip bucket. Instead
             *     it duplicates then here logic in chart transform
             *
             * 2.  The executeVisualization endpoint is useless for GeoChart; cannot be used to render geo chart because
             *     the buckets stored in vis object are not complete. execVisualization takes buckets as is.
             */
            const tooltipText = supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.tooltipText;
            const bucket = this.createVirtualBucketFromLocationAttribute(insight, BucketNames.TOOLTIP_TEXT, tooltipText, "tooltipText_df");
            if (bucket) {
                buckets.push(bucket);
            }
        }
        if (!this.backendCapabilities.supportsSeparateLatitudeLongitudeLabels) {
            return buckets;
        }
        if (supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.latitude) {
            const latitude = supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.latitude;
            const bucket = this.createVirtualBucketFromLocationAttribute(insight, BucketNames.LATITUDE, latitude);
            if (bucket) {
                buckets.push(bucket);
            }
        }
        if (supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.longitude) {
            const longitude = supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.longitude;
            const bucket = this.createVirtualBucketFromLocationAttribute(insight, BucketNames.LONGITUDE, longitude, "longitude_df");
            if (bucket) {
                buckets.push(bucket);
            }
        }
        // do not include original LOCATION bucket (latitude would be duplicated and two executions
        // would be made because of how local IDs of attributes are normalized)
        return buckets.filter((bucket) => bucket.localIdentifier !== BucketNames.LOCATION);
    }
    /**
     * Creates new virtual bucket from existing LOCATION bucket
     * @param insight - current insight
     * @param bucketName - new bucket name
     * @param attributeId - id of bucket item
     * @param attributeLocalIdentifier - local identifier of bucket item, Location item one will be used if not defined
     */
    createVirtualBucketFromLocationAttribute(insight, bucketName, attributeId, attributeLocalIdentifier) {
        const locationBucket = insightBucket(insight, BucketNames.LOCATION);
        if (locationBucket) {
            const attribute = bucketAttribute(locationBucket);
            if (attribute) {
                let ref = idRef(attributeId, "displayForm");
                const alias = attributeAlias(attribute);
                const localIdentifier = attributeLocalId(attribute);
                if (isUriRef(attributeDisplayFormRef(attribute))) {
                    ref = uriRef(attributeId);
                }
                const existingVirtualBucket = insightBucket(insight, bucketName);
                if (!existingVirtualBucket) {
                    return newBucket(bucketName, newAttribute(ref, (m) => m.localId(attributeLocalIdentifier !== null && attributeLocalIdentifier !== void 0 ? attributeLocalIdentifier : localIdentifier).alias(alias)));
                }
            }
        }
        return undefined;
    }
}
//# sourceMappingURL=PluggableGeoPushpinChart.js.map