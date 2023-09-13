// (C) 2021-2022 GoodData Corporation
import React from "react";
import { Typography } from "@gooddata/sdk-ui-kit";
import { insightTitle, widgetTitle } from "@gooddata/sdk-model";
const OriginalInsightTitle = (props) => {
    const { title } = props;
    return (React.createElement(Typography, { tagName: "p", className: "insight-title s-insight-title " },
        React.createElement("span", { title: title, className: "original-insight-title" }, title)));
};
/**
 * @internal
 */
export const DefaultDashboardInsightMenuTitle = (props) => {
    const { widget, insight, renderMode } = props;
    const title = widgetTitle(widget);
    const originalTitle = insightTitle(insight);
    const titlesDiffer = title !== originalTitle;
    const renderedTitle = title ? (React.createElement("span", { title: props.widget.title, className: "insight-title s-insight-title s-insight-title-simple" }, props.widget.title)) : null;
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { tagName: "h3", className: "widget-title s-widget-title" }, renderedTitle),
        renderMode === "edit" && titlesDiffer ? React.createElement(OriginalInsightTitle, { title: originalTitle }) : null));
};
//# sourceMappingURL=DefaultDashboardInsightMenuTitle.js.map