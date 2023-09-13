// (C) 2007-2021 GoodData Corporation
import { isBrokenAlertAttributeFilter } from "../../../types.js";
export function getFilterLabelFilter(item) {
    if (isBrokenAlertAttributeFilter(item)) {
        return {
            isAllSelected: item.isAllSelected,
            isDate: false,
            selection: item.selection,
            selectionSize: item.selectionSize,
            title: item.title,
        };
    }
    else {
        return {
            isAllSelected: false,
            isDate: true,
            selection: item.dateFilterTitle,
            selectionSize: undefined,
            title: item.title,
        };
    }
}
//# sourceMappingURL=filterUtils.js.map