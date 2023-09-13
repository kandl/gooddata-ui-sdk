// (C) 2022 GoodData Corporation
import React from "react";
import { objRefToString, widgetRef } from "@gooddata/sdk-model";
import { stringUtils } from "@gooddata/util";
import { DescriptionClickTrigger } from "./DescriptionClickTrigger.js";
import { useDashboardUserInteraction } from "../../../model/index.js";
export const InsightWidgetDescriptionTrigger = (props) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const { widget, insight } = props;
    const visible = (_c = (_b = (_a = widget.configuration) === null || _a === void 0 ? void 0 : _a.description) === null || _b === void 0 ? void 0 : _b.visible) !== null && _c !== void 0 ? _c : true;
    const description = ((_e = (_d = widget.configuration) === null || _d === void 0 ? void 0 : _d.description) === null || _e === void 0 ? void 0 : _e.source) === "widget" ? widget.description : insight.insight.summary;
    const trimmedDescription = description === null || description === void 0 ? void 0 : description.trim();
    const widgetRefAsString = objRefToString(widgetRef(widget));
    const userInteraction = useDashboardUserInteraction();
    const eventPayload = {
        from: "widget",
        type: ((_g = (_f = widget.configuration) === null || _f === void 0 ? void 0 : _f.description) === null || _g === void 0 ? void 0 : _g.source) === "widget" ? "custom" : "inherit",
        description: trimmedDescription,
    };
    if (visible && trimmedDescription && trimmedDescription !== "") {
        return (React.createElement(DescriptionClickTrigger, { className: `widget-description-${stringUtils.simplifyText(widgetRefAsString)}`, description: trimmedDescription, onOpen: () => userInteraction.descriptionTooltipOpened(eventPayload) }));
    }
    return null;
};
//# sourceMappingURL=InsightWidgetDescriptionTrigger.js.map