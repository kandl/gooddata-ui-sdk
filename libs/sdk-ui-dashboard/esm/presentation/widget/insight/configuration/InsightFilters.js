// (C) 2007-2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";
import InsightDateDataSetFilter from "./InsightDateDataSetFilter.js";
import { isInsightWidget } from "@gooddata/sdk-model";
import { AttributeFilterConfiguration } from "../../common/configuration/AttributeFilterConfiguration.js";
export default function InsightFilters({ widget }) {
    return (React.createElement("div", { className: "s-viz-filters-panel configuration-category" },
        React.createElement(Typography, { tagName: "h3", className: "s-viz-filters-headline" },
            React.createElement(FormattedMessage, { id: "configurationPanel.filterBy" })),
        isInsightWidget(widget) ? React.createElement(InsightDateDataSetFilter, { widget: widget }) : null,
        React.createElement(AttributeFilterConfiguration, { widget: widget })));
}
//# sourceMappingURL=InsightFilters.js.map