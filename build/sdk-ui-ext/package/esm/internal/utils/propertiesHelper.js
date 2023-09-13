// (C) 2019-2023 GoodData Corporation
// eslint-disable-next-line no-restricted-imports -- unfortunately, the get syntax is used heavily here for the supported properties
import get from "lodash/get";
import flow from "lodash/flow";
import has from "lodash/has";
import set from "lodash/set";
import keys from "lodash/keys";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import isNil from "lodash/isNil";
import { BucketNames } from "@gooddata/sdk-ui";
import { AXIS } from "../constants/axis";
import { getItemsCount, getItemsLocalIdentifiers, getMeasureItems, getAllMeasuresShowOnSecondaryAxis, getStackItems, } from "./bucketHelper";
import { PROPERTY_CONTROLS } from "../constants/properties";
import { UICONFIG_AXIS } from "../constants/uiConfig";
import { OPTIONAL_STACKING_PROPERTIES } from "../constants/supportedProperties";
import { bucketsIsEmpty, insightBuckets } from "@gooddata/sdk-model";
export function getSupportedPropertiesControls(visualizationControlsProperties, supportedPropertiesList) {
    const clonedControls = cloneDeep(visualizationControlsProperties);
    if (supportedPropertiesList) {
        return supportedPropertiesList.reduce((props, current) => has(clonedControls, current) ? set(props, current, get(clonedControls, current)) : props, {});
    }
    return {};
}
export function hasColorMapping(properties) {
    var _a;
    return !!((_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.colorMapping);
}
export function setSecondaryMeasures(referencePoint, axisName) {
    var _a, _b, _c;
    if (!axisName) {
        return referencePoint;
    }
    const newReferencePoint = cloneDeep(referencePoint);
    const path = `${PROPERTY_CONTROLS}.${axisName}`;
    const secondaryAxisProperties = (_b = (_a = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[axisName];
    const buckets = (_c = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.buckets) !== null && _c !== void 0 ? _c : [];
    const allMeasures = getMeasureItems(buckets);
    const secondaryMeasures = getAllMeasuresShowOnSecondaryAxis(buckets);
    if (!secondaryAxisProperties && !secondaryMeasures.length) {
        return referencePoint;
    }
    const secondaryAxis = Object.assign(Object.assign({}, secondaryAxisProperties), { measures: getItemsLocalIdentifiers(secondaryMeasures) });
    const axis = {
        0: AXIS.PRIMARY,
        [allMeasures.length]: AXIS.SECONDARY,
    }[secondaryMeasures.length] || AXIS.DUAL;
    set(newReferencePoint, path, secondaryAxis);
    set(newReferencePoint, UICONFIG_AXIS, axis);
    return newReferencePoint;
}
export function isEmptyObject(obj) {
    return obj && keys(obj).length === 0;
}
export function getSupportedProperties(visualizationProperties, supportedPropertiesList) {
    var _a;
    const controls = (_a = visualizationProperties === null || visualizationProperties === void 0 ? void 0 : visualizationProperties.controls) !== null && _a !== void 0 ? _a : {};
    const supportedControls = getSupportedPropertiesControls(controls, supportedPropertiesList);
    return isEmpty(supportedControls)
        ? {}
        : {
            controls: supportedControls,
        };
}
export function getReferencePointWithSupportedProperties(referencePoint, supportedPropertiesList) {
    var _a, _b;
    const supportedControlsProperties = referencePoint.properties
        ? getSupportedPropertiesControls(referencePoint.properties.controls, supportedPropertiesList)
        : {};
    if (isEmpty(supportedControlsProperties)) {
        const sortItems = (_a = referencePoint.properties) === null || _a === void 0 ? void 0 : _a.sortItems;
        const sortItemsExpand = sortItems && !isEmpty(sortItems) ? { sortItems } : {};
        return Object.assign(Object.assign({}, referencePoint), { properties: Object.assign({}, sortItemsExpand) });
    }
    const buckets = (_b = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _b !== void 0 ? _b : [];
    const stackCount = getItemsCount(buckets, BucketNames.STACK);
    const stackMeasuresToPercent = Boolean(supportedControlsProperties.stackMeasuresToPercent);
    if (!stackCount && stackMeasuresToPercent) {
        supportedControlsProperties.stackMeasures = true;
    }
    return Object.assign(Object.assign({}, referencePoint), { properties: Object.assign(Object.assign({}, referencePoint.properties), { controls: supportedControlsProperties }) });
}
export function getReferencePointWithTotalLabelsInitialized(referencePoint) {
    var _a, _b, _c, _d;
    const dataLabelVisibility = (_b = (_a = referencePoint.properties.controls) === null || _a === void 0 ? void 0 : _a.dataLabels) === null || _b === void 0 ? void 0 : _b.visible;
    const stacks = getStackItems(referencePoint.buckets);
    // Initialize total labels visibility with data labels visibility value.
    // Initialize if data labels visibility is defined and total labels visibility
    // is not defined and if current chart configuration allows configuring total labels.
    if (!isNil(dataLabelVisibility) &&
        isNil((_d = (_c = referencePoint.properties.controls) === null || _c === void 0 ? void 0 : _c.dataLabels) === null || _d === void 0 ? void 0 : _d.totalsVisible) &&
        !isStackingToPercent(referencePoint.properties) &&
        (stacks.length || isStackingMeasure(referencePoint.properties))) {
        return Object.assign(Object.assign({}, referencePoint), { properties: Object.assign(Object.assign({}, referencePoint.properties), { controls: Object.assign(Object.assign({}, referencePoint.properties.controls), { dataLabels: Object.assign(Object.assign({}, referencePoint.properties.controls.dataLabels), { totalsVisible: dataLabelVisibility }) }) }) });
    }
    return referencePoint;
}
export function isStackingMeasure(properties) {
    var _a, _b;
    return (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.stackMeasures) !== null && _b !== void 0 ? _b : false;
}
export function isStackingToPercent(properties) {
    var _a, _b;
    return (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.stackMeasuresToPercent) !== null && _b !== void 0 ? _b : false;
}
export function isDualAxisOrSomeSecondaryAxisMeasure(extReferencePoint, secondaryMeasures) {
    var _a, _b, _c;
    return (((_c = (_b = (_a = extReferencePoint === null || extReferencePoint === void 0 ? void 0 : extReferencePoint.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.dualAxis) !== null && _c !== void 0 ? _c : true) ||
        secondaryMeasures.some((item) => item === null || item === void 0 ? void 0 : item.showOnSecondaryAxis));
}
export function removeImmutableOptionalStackingProperties(referencePoint, supportedPropertiesList) {
    var _a;
    const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
    let immutableProperties = [];
    if (getItemsCount(buckets, BucketNames.MEASURES) <= 1) {
        immutableProperties = OPTIONAL_STACKING_PROPERTIES;
    }
    if (getItemsCount(buckets, BucketNames.STACK)) {
        immutableProperties = OPTIONAL_STACKING_PROPERTIES.slice(0, 1);
    }
    return supportedPropertiesList.filter((property) => !immutableProperties.some((immutableProperty) => immutableProperty === property));
}
// mapping between AD and SDK values
const AXIS_NAME_POSITION_MAPPING = {
    auto: "middle",
    bottom: "low",
    middle: "middle",
    top: "high",
    left: "low",
    center: "middle",
    right: "high",
};
const AXIS_TYPES = ["xaxis", "yaxis", "secondary_xaxis", "secondary_yaxis"];
export function getHighchartsAxisNameConfiguration(controlProperties, enableAxisNameConfiguration = false) {
    const axisProperties = AXIS_TYPES.reduce((result, axis) => {
        var _a;
        const axisNameConfig = (_a = controlProperties === null || controlProperties === void 0 ? void 0 : controlProperties[axis]) === null || _a === void 0 ? void 0 : _a.name;
        if (isEmpty(axisNameConfig)) {
            return result;
        }
        axisNameConfig.position =
            AXIS_NAME_POSITION_MAPPING[enableAxisNameConfiguration ? axisNameConfig.position : AXIS_NAME_POSITION_MAPPING.auto];
        result[axis] = Object.assign(Object.assign({}, controlProperties[axis]), { name: axisNameConfig });
        return result;
    }, {});
    return Object.assign(Object.assign({}, controlProperties), axisProperties);
}
export function getDataPointsConfiguration(controlProperties, enableHidingOfDataPoints = false) {
    var _a;
    if (enableHidingOfDataPoints) {
        const dataPointsVisible = (_a = controlProperties.dataPoints) === null || _a === void 0 ? void 0 : _a.visible;
        return Object.assign(Object.assign({}, controlProperties), { dataPoints: {
                visible: dataPointsVisible !== undefined ? dataPointsVisible : "auto",
            } });
    }
    return Object.assign(Object.assign({}, controlProperties), { dataPoints: {
            visible: undefined,
        } });
}
export function getColumnWidthsFromProperties(visualizationProperties) {
    var _a;
    return (_a = visualizationProperties === null || visualizationProperties === void 0 ? void 0 : visualizationProperties.controls) === null || _a === void 0 ? void 0 : _a.columnWidths;
}
export function getLegendConfiguration(controlProperties, insight) {
    const legendPosition = getLegendPosition(controlProperties, insight);
    set(controlProperties, "legend.position", legendPosition);
    return controlProperties;
}
export function getLegendConfigurationDashboardsEnv(controlProperties, options, enableKDWidgetCustomHeight) {
    const legendPosition = getLegendPositionDashboardsEnv(controlProperties, options);
    set(controlProperties, "legend.position", legendPosition);
    const legendResponsiveness = enableKDWidgetCustomHeight ? "autoPositionWithPopup" : true;
    set(controlProperties, "legend.responsive", legendResponsiveness);
    return controlProperties;
}
export function getChartSupportedControls(controlProperties, insight, settings) {
    return flow((c) => cloneDeep(c !== null && c !== void 0 ? c : {}), (c) => getLegendConfiguration(c, insight), (c) => getHighchartsAxisNameConfiguration(c, settings === null || settings === void 0 ? void 0 : settings.enableAxisNameConfiguration), (c) => getDataPointsConfiguration(c, settings === null || settings === void 0 ? void 0 : settings.enableHidingOfDataPoints))(controlProperties);
}
export function getChartSupportedControlsDashboardsEnv(controlProperties, options, settings) {
    return flow((c) => cloneDeep(c !== null && c !== void 0 ? c : {}), (c) => getLegendConfigurationDashboardsEnv(c, options, settings === null || settings === void 0 ? void 0 : settings.enableKDWidgetCustomHeight), (c) => getHighchartsAxisNameConfiguration(c, settings === null || settings === void 0 ? void 0 : settings.enableAxisNameConfiguration), (c) => getDataPointsConfiguration(c, settings === null || settings === void 0 ? void 0 : settings.enableHidingOfDataPoints))(controlProperties);
}
function getLegendPosition(controlProperties, insight) {
    var _a, _b;
    const legendPosition = (_b = (_a = controlProperties === null || controlProperties === void 0 ? void 0 : controlProperties.legend) === null || _a === void 0 ? void 0 : _a.position) !== null && _b !== void 0 ? _b : "auto";
    return legendPosition === "auto" && isStacked(insight) ? "right" : legendPosition;
}
function getLegendPositionDashboardsEnv(controlProperties, options) {
    var _a, _b, _c;
    const legendPosition = (_b = (_a = controlProperties === null || controlProperties === void 0 ? void 0 : controlProperties.legend) === null || _a === void 0 ? void 0 : _a.position) !== null && _b !== void 0 ? _b : "auto";
    const width = (_c = options.dimensions) === null || _c === void 0 ? void 0 : _c.width;
    return width !== undefined && width <= getMaxWidthForCollapsedLegend(legendPosition)
        ? "top"
        : legendPosition;
}
function isStacked(insight) {
    return !bucketsIsEmpty(insightBuckets(insight, BucketNames.STACK, BucketNames.SEGMENT));
}
const MAX_WIDTH_FOR_COLLAPSED_LEGEND = 440;
const MAX_WIDTH_FOR_COLLAPSED_AUTO_LEGEND = 610;
function getMaxWidthForCollapsedLegend(legendPosition) {
    return legendPosition === "auto" ? MAX_WIDTH_FOR_COLLAPSED_AUTO_LEGEND : MAX_WIDTH_FOR_COLLAPSED_LEGEND;
}
//# sourceMappingURL=propertiesHelper.js.map