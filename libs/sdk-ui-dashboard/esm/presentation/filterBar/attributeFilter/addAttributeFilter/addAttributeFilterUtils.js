// (C) 2023 GoodData Corporation
import { insightVisualizationType } from "@gooddata/sdk-model";
const SUPPORTED_LOCATION_ICON_CHART_TYPES = ["pushpin"];
export const isLocationIconEnabled = (insightWidgets, insightsMap) => {
    return insightWidgets
        .map((it) => insightsMap.get(it === null || it === void 0 ? void 0 : it.insight))
        .map((it) => (it && insightVisualizationType(it)))
        .some((it) => SUPPORTED_LOCATION_ICON_CHART_TYPES.includes(it));
};
//# sourceMappingURL=addAttributeFilterUtils.js.map