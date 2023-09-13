// (C) 2021-2022 GoodData Corporation
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
import { areObjRefsEqual, attributeElementsCount, attributeElementsIsEmpty, isAttributeElementsByRef, objRefToString, } from "@gooddata/sdk-model";
import { translateDateFilter } from "./translationUtils.js";
import { isBrokenAlertAttributeFilterInfo, isBrokenAlertDateFilterInfo, } from "../../../../../../model/index.js";
/**
 * Takes basic broken alert info and adds additional information used for displaying of such filters to the user.
 *
 * @param brokenAlertFilters - the basic broken alert filters info to enrich
 * @param intl - the intl object used
 * @param dateFormat - the date format to be used
 * @param dateDataSets - all available date data sets
 * @param attributeFiltersMeta - additional information about attribute filters (see {@link IAttributeFilterMetaCollection} for details)
 */
export function enrichBrokenAlertsInfo(brokenAlertFilters, intl, dateFormat, dateDataSets, attributeFiltersMeta) {
    return brokenAlertFilters.map((brokenFilter) => {
        if (isBrokenAlertAttributeFilterInfo(brokenFilter)) {
            return enrichBrokenAttributeFilter(brokenFilter, attributeFiltersMeta);
        }
        if (isBrokenAlertDateFilterInfo(brokenFilter)) {
            return enrichBrokenDateFilter(brokenFilter, intl, dateFormat, dateDataSets);
        }
        throw new UnexpectedError("Unknown broken alert filter type.");
    });
}
function enrichBrokenDateFilter(brokenFilter, intl, dateFormat, dateDataSets) {
    var _a;
    const { alertFilter, brokenType } = brokenFilter;
    const dateFilterTitle = translateDateFilter(alertFilter, intl, dateFormat);
    const matchingDateDataset = dateDataSets.find((dataset) => areObjRefsEqual(dataset, alertFilter.dateFilter.dataSet));
    return {
        type: "date",
        brokenType: brokenType,
        dateFilterTitle,
        title: (_a = matchingDateDataset === null || matchingDateDataset === void 0 ? void 0 : matchingDateDataset.title) !== null && _a !== void 0 ? _a : intl.formatMessage({ id: "kpiAlertDialog.brokenAlertDefaultDateLabel" }),
    };
}
function enrichBrokenAttributeFilter(brokenFilter, attributeFiltersMeta) {
    const { alertFilter, brokenType } = brokenFilter;
    const metaKey = objRefToString(alertFilter.attributeFilter.displayForm);
    const meta = attributeFiltersMeta[metaKey];
    const isNegative = alertFilter.attributeFilter.negativeSelection;
    const totalCount = meta.totalElementsCount;
    const elements = meta.validElements.filter((element) => {
        const isInSelected = isAttributeElementsByRef(alertFilter.attributeFilter.attributeElements)
            ? alertFilter.attributeFilter.attributeElements.uris.some((uri) => uri === element.uri)
            : alertFilter.attributeFilter.attributeElements.values.some((value) => value === element.title);
        return isInSelected !== isNegative;
    });
    const selection = elements.map((el) => el.title).join(", ");
    const title = meta.title;
    const selectedCount = attributeElementsCount(alertFilter.attributeFilter.attributeElements);
    return {
        type: "attribute",
        brokenType: brokenType,
        isAllSelected: isNegative && attributeElementsIsEmpty(alertFilter.attributeFilter.attributeElements),
        selection,
        selectionSize: isNegative ? totalCount - selectedCount : selectedCount,
        title,
    };
}
//# sourceMappingURL=brokenFilterUtils.js.map