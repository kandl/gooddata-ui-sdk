import { convertDrillableItemsToPredicates, DataViewFacade, isSomeHeaderPredicateMatched, } from "@gooddata/sdk-ui";
import BaseHeadlineDataItem from "../headlines/baseHeadline/baseHeadlineDataItems/BaseHeadlineDataItem.js";
import { createHeadlineDataItem, getExecutionData, } from "./HeadlineTransformationUtils.js";
export function getBaseHeadlineData(dataView, drillableItems) {
    const drillablePredicates = convertDrillableItemsToPredicates(drillableItems);
    const dv = DataViewFacade.for(dataView);
    const executionData = getExecutionData(dv);
    const itemHeaders = dv.meta().measureDescriptors();
    const primaryItem = createBaseHeadlineItem(executionData[0], isSomeHeaderPredicateMatched(drillablePredicates, itemHeaders[0], dv), "primaryValue");
    let secondaryItemData;
    let secondaryItemHeader;
    let tertiaryItemData;
    let tertiaryItemHeader;
    if (executionData.length === 3) {
        // There are 2 secondary metrics
        // The left item will be the second metric
        // The right item will be the third metric
        secondaryItemData = executionData[2];
        secondaryItemHeader = itemHeaders[2];
        tertiaryItemData = executionData[1];
        tertiaryItemHeader = itemHeaders[1];
    }
    else {
        secondaryItemData = executionData[1];
        secondaryItemHeader = itemHeaders[1];
    }
    const secondaryItem = createBaseHeadlineItem(secondaryItemData, secondaryItemHeader && isSomeHeaderPredicateMatched(drillablePredicates, secondaryItemHeader, dv), "secondaryValue");
    const tertiaryItem = createBaseHeadlineItem(tertiaryItemData, tertiaryItemHeader && isSomeHeaderPredicateMatched(drillablePredicates, tertiaryItemHeader, dv), "secondaryValue");
    return {
        primaryItem,
        secondaryItem,
        tertiaryItem,
    };
}
export function createBaseHeadlineItem(executionData, isDrillable, elementType) {
    const data = createHeadlineDataItem(executionData, isDrillable);
    return data
        ? {
            data,
            elementType,
            baseHeadlineDataItemComponent: BaseHeadlineDataItem,
        }
        : null;
}
//# sourceMappingURL=BaseHeadlineTransformationUtils.js.map