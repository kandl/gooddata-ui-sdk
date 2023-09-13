import { Bubble, BubbleHoverTrigger, Checkbox, Message } from "@gooddata/sdk-ui-kit";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { changeInsightWidgetVisProperties, selectInsightByRef, useDashboardDispatch, useDashboardSelector, } from "../../../../model/index.js";
import { getInsightVisualizationMeta } from "@gooddata/sdk-ui-ext";
export function ZoomInsightConfiguration(props) {
    var _a, _b;
    const { widget } = props;
    const intl = useIntl();
    // useState helps the status of checkbox change faster than using the zoomable value
    const [zoomInsightState, setZoomInsightStatus] = useState((_b = (_a = widget.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.zoomInsight);
    const dispatch = useDashboardDispatch();
    const insight = useDashboardSelector(selectInsightByRef(widget.insight));
    if (!insight) {
        return null;
    }
    const visualizationMeta = getInsightVisualizationMeta(insight);
    if (!visualizationMeta.supportsZooming) {
        return null;
    }
    const handleZoomableChange = (isChecked) => {
        var _a;
        setZoomInsightStatus(isChecked);
        dispatch(changeInsightWidgetVisProperties(widget.ref, Object.assign(Object.assign({}, widget.properties), { controls: Object.assign(Object.assign({}, (_a = widget.properties) === null || _a === void 0 ? void 0 : _a.controls), { zoomInsight: isChecked }) })));
    };
    return (React.createElement("div", { className: "s-zoom-and-pan zoom-and-pan-section configuration-category" },
        React.createElement(Checkbox, { onChange: handleZoomableChange, value: zoomInsightState, text: intl.formatMessage({ id: "configurationPanel.zoomInsight" }) }),
        React.createElement(BubbleHoverTrigger, { tagName: "abbr", hideDelay: 1000, showDelay: 100 },
            React.createElement("i", { className: "gd-button-link gd-icon-circle-question s-circle_question gd-button" }),
            React.createElement(Bubble, { alignTo: ".gd-icon-circle-question", alignPoints: [{ align: "cr cl" }] }, intl.formatMessage({ id: "configurationPanel.zoomInsight.help" }))),
        zoomInsightState ? (React.createElement(Message, { type: "progress" }, intl.formatMessage({ id: "configurationPanel.zoomInsight.notice" }))) : null));
}
//# sourceMappingURL=ZoomInsightConfiguration.js.map