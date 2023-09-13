// (C) 2007-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import isEmpty from "lodash/isEmpty.js";
import isNumber from "lodash/isNumber.js";
import { invariant } from "ts-invariant";
import { DataViewFacade, isSomeHeaderPredicateMatched, VisualizationTypes, } from "@gooddata/sdk-ui";
function createTertiaryItem(executionData, intl) {
    var _a, _b, _c;
    const secondaryHeaderItem = (_a = executionData === null || executionData === void 0 ? void 0 : executionData[1]) === null || _a === void 0 ? void 0 : _a.measureHeaderItem;
    if (!secondaryHeaderItem) {
        return null;
    }
    const primaryValueString = (_b = executionData === null || executionData === void 0 ? void 0 : executionData[0]) === null || _b === void 0 ? void 0 : _b.value;
    const primaryValue = primaryValueString !== null ? Number(primaryValueString) : null;
    const secondaryValueString = (_c = executionData === null || executionData === void 0 ? void 0 : executionData[1]) === null || _c === void 0 ? void 0 : _c.value;
    const secondaryValue = secondaryValueString !== null ? Number(secondaryValueString) : null;
    const tertiaryTitle = intl.formatMessage({ id: "visualizations.headline.tertiary.title" });
    const isCountableValue = isNumber(primaryValue) && isNumber(secondaryValue);
    const tertiaryValue = isCountableValue && secondaryValue !== 0
        ? ((primaryValue - secondaryValue) / secondaryValue) * 100
        : null;
    return {
        localIdentifier: "tertiaryIdentifier",
        title: tertiaryTitle,
        value: tertiaryValue !== null ? String(tertiaryValue) : null,
        format: null,
        isDrillable: false,
    };
}
export function createHeadlineDataItem(executionDataItem, isDrillable) {
    if (!executionDataItem) {
        return null;
    }
    return {
        localIdentifier: executionDataItem.measureHeaderItem.localIdentifier,
        title: executionDataItem.measureHeaderItem.name,
        value: executionDataItem.value ? String(executionDataItem.value) : null,
        format: executionDataItem.measureHeaderItem.format,
        isDrillable: !!isDrillable,
    };
}
export function getExecutionData(dv) {
    const headerItems = dv.meta().measureDescriptors();
    const data = dv.rawData().singleDimData();
    return headerItems.map((item, index) => {
        const value = data[index];
        invariant(value !== undefined, "Undefined execution value data for headline transformation");
        invariant(item.measureHeaderItem, "Missing expected measureHeaderItem");
        return {
            measureHeaderItem: item.measureHeaderItem,
            value,
        };
    });
}
/**
 * Get {@link IHeadlineData} used by the {@link Headline} component.
 *
 * @param dataView - data to visualize
 * @param intl - Required localization for compare item title
 */
export function getHeadlineData(dataView, intl) {
    const dv = DataViewFacade.for(dataView);
    const executionData = getExecutionData(dv);
    const primaryItem = createHeadlineDataItem(executionData[0]);
    const secondaryItem = createHeadlineDataItem(executionData[1]);
    const secondaryItemProp = secondaryItem ? { secondaryItem } : {};
    const tertiaryItem = createTertiaryItem(executionData, intl);
    const tertiaryItemProp = tertiaryItem ? { tertiaryItem } : {};
    return Object.assign(Object.assign({ primaryItem }, secondaryItemProp), tertiaryItemProp);
}
/**
 * Take headline data and apply list of drillable items.
 * The method will return copied collection of the headline data with altered drillable status.
 *
 * @param headlineData - The headline data that we want to change the drillable status.
 * @param drillableItems - list of drillable items
 * @param dataView - data visualized by the headline
 * @returns altered headlineData
 */
export function applyDrillableItems(headlineData, drillableItems, dataView) {
    const dv = DataViewFacade.for(dataView);
    const data = cloneDeep(headlineData);
    const { primaryItem, secondaryItem } = data;
    const [primaryItemHeader, secondaryItemHeader] = dv.meta().measureDescriptors();
    if (!isEmpty(primaryItem) && !isEmpty(primaryItemHeader)) {
        primaryItem.isDrillable = isSomeHeaderPredicateMatched(drillableItems, primaryItemHeader, dv);
    }
    if (!isEmpty(secondaryItem) && !isEmpty(secondaryItemHeader)) {
        secondaryItem.isDrillable = isSomeHeaderPredicateMatched(drillableItems, secondaryItemHeader, dv);
    }
    return data;
}
/**
 * Build drill event data (object with execution and drill context) from the data obtained by clicking on the {@link Headline}
 * component an from the execution objects.
 *
 * @param itemContext - data received from the click on the {@link Headline} component.
 * @param dataView - data visualized by the headline
 */
export function buildDrillEventData(itemContext, dataView) {
    const dv = DataViewFacade.for(dataView);
    const measureHeaderItem = dv.meta().measureDescriptor(itemContext.localIdentifier);
    if (!measureHeaderItem) {
        throw new Error("The metric uri has not been found in execution response!");
    }
    const intersectionElement = {
        header: measureHeaderItem,
    };
    const drillContext = {
        type: VisualizationTypes.HEADLINE,
        element: itemContext.element,
        value: itemContext.value,
        intersection: [intersectionElement],
    };
    return {
        dataView,
        drillContext,
    };
}
//# sourceMappingURL=HeadlineTransformationUtils.js.map