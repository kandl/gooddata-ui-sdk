// (C) 2022 GoodData Corporation
import React from "react";
import { areObjRefsEqual, objRefToString } from "@gooddata/sdk-model";
import { stringUtils } from "@gooddata/util";
import { useDashboardSelector, selectCatalogMeasures, useDashboardUserInteraction, } from "../../../../../model/index.js";
import { DescriptionClickTrigger } from "../../../description/DescriptionClickTrigger.js";
const getKpiMetricDescription = (metrics, ref) => {
    var _a;
    return (_a = metrics.find((metric) => areObjRefsEqual(metric.measure.ref, ref))) === null || _a === void 0 ? void 0 : _a.measure.description;
};
export const KpiDescriptionTrigger = (props) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const { kpi } = props;
    const visible = (_c = (_b = (_a = kpi.configuration) === null || _a === void 0 ? void 0 : _a.description) === null || _b === void 0 ? void 0 : _b.visible) !== null && _c !== void 0 ? _c : true;
    const metrics = useDashboardSelector(selectCatalogMeasures);
    const description = ((_e = (_d = kpi.configuration) === null || _d === void 0 ? void 0 : _d.description) === null || _e === void 0 ? void 0 : _e.source) === "kpi"
        ? kpi.description
        : getKpiMetricDescription(metrics, kpi.kpi.metric);
    const trimmedDescription = description === null || description === void 0 ? void 0 : description.trim();
    const kpiRefAsString = kpi.ref ? objRefToString(kpi.ref) : "";
    const userInteraction = useDashboardUserInteraction();
    const eventPayload = {
        from: "kpi",
        type: ((_g = (_f = kpi.configuration) === null || _f === void 0 ? void 0 : _f.description) === null || _g === void 0 ? void 0 : _g.source) === "kpi" ? "custom" : "inherit",
        description: trimmedDescription,
    };
    if (visible && trimmedDescription && trimmedDescription !== "") {
        return (React.createElement(DescriptionClickTrigger, { className: `kpi-description-${stringUtils.simplifyText(kpiRefAsString)}`, description: trimmedDescription, onOpen: () => userInteraction.descriptionTooltipOpened(eventPayload) }));
    }
    return null;
};
//# sourceMappingURL=KpiDescriptionTrigger.js.map