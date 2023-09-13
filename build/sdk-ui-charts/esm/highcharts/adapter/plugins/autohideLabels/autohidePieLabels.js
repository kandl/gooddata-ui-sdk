// (C) 2007-2021 GoodData Corporation
import fill from "lodash/fill.js";
import { getVisibleSeries, getDataPoints, isIntersecting, } from "../../../chartTypes/_chartCreators/helpers.js";
// delete this plugin once we upgrade to newer highcharts,
// set allowOverlap: false to get this behaviour
const autohidePieLabels = (chart) => {
    var _a, _b;
    const visibleSeries = getVisibleSeries(chart);
    const visiblePoints = getDataPoints(visibleSeries);
    if (!visiblePoints || visiblePoints.length === 0) {
        return;
    }
    const visibilityMap = fill(Array(visiblePoints.length), true);
    for (let i = 0; i < visiblePoints.length; i++) {
        // TODO the as any cast is sketchy, but this is what was in the original lodash/get call
        const actualLabel = (_a = visiblePoints === null || visiblePoints === void 0 ? void 0 : visiblePoints[i]) === null || _a === void 0 ? void 0 : _a.dataLabel;
        // do nothing if label not found or already hidden
        if (!actualLabel || !visibilityMap[i]) {
            continue;
        }
        for (let neighborIdx = i + 1; neighborIdx < visiblePoints.length; neighborIdx++) {
            // TODO the as any cast is sketchy, but this is what was in the original lodash/get call
            const neighborLabel = (_b = visiblePoints === null || visiblePoints === void 0 ? void 0 : visiblePoints[neighborIdx]) === null || _b === void 0 ? void 0 : _b.dataLabel;
            // do nothing if label not found or already hidden
            if (!neighborLabel || !visibilityMap[neighborIdx]) {
                continue;
            }
            const intersects = isIntersecting(actualLabel, neighborLabel);
            if (!intersects) {
                neighborLabel.show();
            }
            else {
                visibilityMap[neighborIdx] = false;
                neighborLabel.hide();
            }
        }
    }
};
export default autohidePieLabels;
//# sourceMappingURL=autohidePieLabels.js.map