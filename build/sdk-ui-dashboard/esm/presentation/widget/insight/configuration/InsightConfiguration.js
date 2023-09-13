// (C) 2022-2023 GoodData Corporation
import React from "react";
import { isInsightWidget, objRefToString, } from "@gooddata/sdk-model";
import { ScrollablePanel, OverlayControllerProvider, OverlayController } from "@gooddata/sdk-ui-kit";
import { stringUtils } from "@gooddata/util";
import cx from "classnames";
import { useDashboardSelector, selectSettings, useDashboardDispatch, changeInsightWidgetVisConfiguration, changeInsightWidgetDescription, } from "../../../../model/index.js";
import { DASHBOARD_HEADER_OVERLAYS_Z_INDEX } from "../../../constants/index.js";
import InsightFilters from "./InsightFilters.js";
import { InsightTitleConfig } from "./InsightTitleConfig.js";
import { InsightDescriptionConfig } from "./InsightDescriptionConfig/InsightDescriptionConfig.js";
const overlayController = OverlayController.getInstance(DASHBOARD_HEADER_OVERLAYS_Z_INDEX);
export const InsightConfiguration = ({ widget }) => {
    var _a, _b, _c, _d, _e, _f;
    const widgetRefSuffix = isInsightWidget(widget)
        ? stringUtils.simplifyText(objRefToString(widget.ref))
        : "";
    const settings = useDashboardSelector(selectSettings);
    const dispatch = useDashboardDispatch();
    const classes = cx("configuration-scrollable-panel", "s-configuration-scrollable-panel", `s-visualization-${widgetRefSuffix}`);
    const defaultDescriptionConfig = {
        source: "insight",
        includeMetrics: false,
        visible: true,
    };
    return (React.createElement(ScrollablePanel, { className: classes },
        React.createElement(OverlayControllerProvider, { overlayController: overlayController },
            React.createElement(InsightTitleConfig, { widget: widget, isHidingOfWidgetTitleEnabled: (_a = settings.enableHidingOfWidgetTitle) !== null && _a !== void 0 ? _a : false, hideTitle: (_c = (_b = widget.configuration) === null || _b === void 0 ? void 0 : _b.hideTitle) !== null && _c !== void 0 ? _c : false, setVisualPropsConfigurationTitle: (widget, hideTitle) => {
                    dispatch(changeInsightWidgetVisConfiguration(widget.ref, Object.assign(Object.assign({}, widget.configuration), { hideTitle })));
                } }),
            React.createElement(InsightDescriptionConfig, { widget: widget, isWidgetDescriptionEnabled: (_d = settings.enableDescriptions) !== null && _d !== void 0 ? _d : false, descriptionConfig: (_f = (_e = widget.configuration) === null || _e === void 0 ? void 0 : _e.description) !== null && _f !== void 0 ? _f : defaultDescriptionConfig, setDescriptionConfiguration: (widget, config) => {
                    dispatch(changeInsightWidgetVisConfiguration(widget.ref, Object.assign(Object.assign({ hideTitle: false }, widget.configuration), { description: config })));
                }, setWidgetDescription: (widget, description) => {
                    dispatch(changeInsightWidgetDescription(widget.ref, {
                        description,
                    }));
                } }),
            React.createElement(InsightFilters, { widget: widget }))));
};
//# sourceMappingURL=InsightConfiguration.js.map