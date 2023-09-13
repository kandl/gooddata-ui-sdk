// (C) 2022 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { Checkbox, BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
const tooltipAlignPoints = [
    { align: "cr cl", offset: { x: 0, y: 0 } },
    { align: "cl cr", offset: { x: 0, y: -2 } },
];
export function IncludeMetrics(props) {
    const { value, onChange } = props;
    const intl = useIntl();
    return (React.createElement("div", { className: "include-metrics-wrapper" },
        React.createElement(Checkbox, { onChange: onChange, value: value, text: intl.formatMessage({ id: "configurationPanel.visualprops.includeMetrics" }), labelSize: "small" }),
        React.createElement(BubbleHoverTrigger, { tagName: "div", showDelay: 200, hideDelay: 0 },
            React.createElement("span", { className: "gd-icon-circle-question" }),
            React.createElement(Bubble, { className: "bubble-primary", alignPoints: tooltipAlignPoints, arrowOffsets: { "cr cl": [15, 0] } }, intl.formatMessage({ id: "configurationPanel.visualprops.includeMetricsHelp" })))));
}
//# sourceMappingURL=IncludeMetrics.js.map