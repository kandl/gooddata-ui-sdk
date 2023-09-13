// (C) 2019-2020 GoodData Corporation
import isArray from "lodash/isArray.js";
export function truncate(items, maxLength) {
    if (!items) {
        return [];
    }
    if (isArray(items)) {
        // only get first two attributes
        return items.slice(0, maxLength);
    }
    return [items];
}
//# sourceMappingURL=truncate.js.map