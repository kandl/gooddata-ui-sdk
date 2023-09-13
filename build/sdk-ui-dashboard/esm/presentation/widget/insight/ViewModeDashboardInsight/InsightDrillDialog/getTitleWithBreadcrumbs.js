// (C) 2021 GoodData Corporation
import compact from "lodash/compact.js";
export function getTitleWithBreadcrumbs(insightTitle, breadcrumbs) {
    const separator = "\u203A";
    const paddedSeparator = ` ${separator} `;
    return compact([insightTitle, ...breadcrumbs]).join(paddedSeparator);
}
//# sourceMappingURL=getTitleWithBreadcrumbs.js.map