import isNil from "lodash/isNil.js";
import isNumber from "lodash/isNumber.js";
import isString from "lodash/isString.js";
import { convertDrillableItemsToPredicates, DataViewFacade, isSomeHeaderPredicateMatched, } from "@gooddata/sdk-ui";
import { CalculateAs, ComparisonPositionValues, } from "../../../../interfaces/index.js";
import { EvaluationType } from "../interfaces/BaseHeadlines.js";
import { getExecutionData } from "./HeadlineTransformationUtils.js";
import { getCalculationValuesDefault, getComparisonFormat } from "../../headlineHelper.js";
import ComparisonDataItem from "../headlines/baseHeadline/baseHeadlineDataItems/ComparisonDataItem.js";
import { createBaseHeadlineItem } from "./BaseHeadlineTransformationUtils.js";
export function getComparisonBaseHeadlineData(dataView, drillableItems, comparison, intl) {
    var _a;
    const drillablePredicates = convertDrillableItemsToPredicates(drillableItems);
    const dv = DataViewFacade.for(dataView);
    const executionData = getExecutionData(dv);
    const [primaryItemHeader, secondaryItemHeader] = dv.meta().measureDescriptors();
    const [primaryItemData, secondaryItemData] = executionData;
    const primaryItem = createBaseHeadlineItem(primaryItemData, isSomeHeaderPredicateMatched(drillablePredicates, primaryItemHeader, dv), "primaryValue");
    const secondaryItem = createBaseHeadlineItem(secondaryItemData, isSomeHeaderPredicateMatched(drillablePredicates, secondaryItemHeader, dv), "secondaryValue");
    const comparisonItem = createComparisonItem(executionData, dv.meta().isDerivedMeasure(secondaryItemHeader), (_a = primaryItem.data) === null || _a === void 0 ? void 0 : _a.format, comparison, intl);
    const baseHeadlineData = {
        primaryItem,
        secondaryItem,
        tertiaryItem: comparisonItem,
    };
    return positionBaseHeadlineItems(baseHeadlineData, comparison);
}
function positionBaseHeadlineItems(baseHeadlineData, comparison) {
    switch (comparison === null || comparison === void 0 ? void 0 : comparison.position) {
        case ComparisonPositionValues.TOP:
            return {
                primaryItem: baseHeadlineData.tertiaryItem,
                secondaryItem: baseHeadlineData.secondaryItem,
                tertiaryItem: baseHeadlineData.primaryItem,
            };
        case ComparisonPositionValues.RIGHT:
            return {
                primaryItem: baseHeadlineData.primaryItem,
                secondaryItem: baseHeadlineData.tertiaryItem,
                tertiaryItem: baseHeadlineData.secondaryItem,
            };
        case ComparisonPositionValues.LEFT:
        case ComparisonPositionValues.AUTO:
        default:
            return baseHeadlineData;
    }
}
function createComparisonItem(executionData, isSecondaryDerivedMeasure, inheritFormat, comparison, intl) {
    const data = createComparisonDataItem(executionData, isSecondaryDerivedMeasure, inheritFormat, comparison, intl);
    return {
        data,
        baseHeadlineDataItemComponent: ComparisonDataItem,
        evaluationType: getComparisonEvaluationType(executionData),
    };
}
function getComparisonEvaluationType(executionData) {
    var _a, _b;
    const [primaryItem, secondaryItem, tertiaryItem] = executionData;
    if (!isNumeric(primaryItem.value) || !isNumeric(secondaryItem.value) || !isNumeric(tertiaryItem.value)) {
        return null;
    }
    const primaryItemValue = (_a = primaryItem.value) !== null && _a !== void 0 ? _a : 0;
    const secondaryItemValue = (_b = secondaryItem.value) !== null && _b !== void 0 ? _b : 0;
    if (primaryItemValue > secondaryItemValue) {
        return EvaluationType.POSITIVE_VALUE;
    }
    if (primaryItemValue < secondaryItemValue) {
        return EvaluationType.NEGATIVE_VALUE;
    }
    return EvaluationType.EQUALS_VALUE;
}
function createComparisonDataItem(executionData, isSecondaryDerivedMeasure, inheritFormat, comparison, intl) {
    const { calculationType, format, labelConfig } = comparison;
    const [, , tertiaryItemData] = executionData;
    const { measureHeaderItem } = tertiaryItemData;
    const { localIdentifier } = measureHeaderItem;
    const defaultCalculationType = isSecondaryDerivedMeasure ? CalculateAs.CHANGE : CalculateAs.RATIO;
    const { defaultFormat, defaultLabelKey } = getCalculationValuesDefault(calculationType !== null && calculationType !== void 0 ? calculationType : defaultCalculationType);
    return {
        title: getComparisonTitle(labelConfig, intl.formatMessage({ id: defaultLabelKey })),
        value: getComparisonValue(executionData),
        format: getComparisonFormat(format, defaultFormat) || inheritFormat,
        localIdentifier,
    };
}
function getComparisonValue(executionData) {
    const [primaryItem, secondaryItem, tertiaryItem] = executionData;
    if (!isNumeric(primaryItem.value) || !isNumeric(secondaryItem.value)) {
        return null;
    }
    const { value } = tertiaryItem;
    return isNil(value) ? value : String(value);
}
function isNumeric(value) {
    return (isNumber(value) || (isString(value) && value.trim())) && !isNaN(value);
}
function getComparisonTitle(labelConfig, defaultLabel) {
    return (labelConfig === null || labelConfig === void 0 ? void 0 : labelConfig.unconditionalValue) || defaultLabel;
}
//# sourceMappingURL=ComparisonTransformationUtils.js.map