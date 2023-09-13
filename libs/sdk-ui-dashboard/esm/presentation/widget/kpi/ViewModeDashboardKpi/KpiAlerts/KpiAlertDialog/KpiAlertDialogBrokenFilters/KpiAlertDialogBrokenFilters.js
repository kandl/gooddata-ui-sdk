// (C) 2007-2022 GoodData Corporation
import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import partition from "lodash/partition.js";
import { FilterLabel } from "@gooddata/sdk-ui-kit";
import { getFilterLabelFilter } from "./utils/filterUtils.js";
const ITEMS_SCROLL_LIMIT = 5;
const KpiAlertDialogBrokenFiltersSection = ({ filters, type, }) => {
    if (!filters.length) {
        return null;
    }
    const contentClassNames = cx("filter-section-content", {
        "more-items": filters.length > ITEMS_SCROLL_LIMIT,
    });
    return (React.createElement("div", { className: "filter-section" },
        React.createElement("div", { className: "filter-section-headline" }, type === "deleted" ? (React.createElement(FormattedMessage, { id: "kpiAlertDialog.removedFilters" })) : (React.createElement(FormattedMessage, { id: "kpiAlertDialog.ignoredFilters" }))),
        React.createElement("div", { className: contentClassNames }, filters.map((filter) => {
            const filterProps = getFilterLabelFilter(filter);
            return (React.createElement("div", { className: "attribute-filter-label", key: filter.title },
                React.createElement(FilterLabel, Object.assign({}, filterProps))));
        }))));
};
export const KpiAlertDialogBrokenFilters = ({ brokenFilters, }) => {
    const [deletedFilters, ignoredFilters] = useMemo(() => partition(brokenFilters, (filter) => filter.brokenType === "deleted"), [brokenFilters]);
    return (React.createElement(React.Fragment, null,
        React.createElement(KpiAlertDialogBrokenFiltersSection, { filters: deletedFilters, type: "deleted" }),
        React.createElement(KpiAlertDialogBrokenFiltersSection, { filters: ignoredFilters, type: "ignored" })));
};
//# sourceMappingURL=KpiAlertDialogBrokenFilters.js.map