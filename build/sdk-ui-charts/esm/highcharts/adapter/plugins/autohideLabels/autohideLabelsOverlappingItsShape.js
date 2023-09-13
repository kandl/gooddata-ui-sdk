// (C) 2007-2020 GoodData Corporation
import { getDataPoints, getVisibleSeries } from "../../../chartTypes/_chartCreators/helpers.js";
import { intersectsParentLabel, isLabelOverlappingItsShape, hideDataLabel, showDataLabel, } from "../../../chartTypes/_chartCreators/dataLabelsHelpers.js";
function autohideLabelsOverlappingItsShape(
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
chart, hideFunction = hideDataLabel, showFunction = showDataLabel) {
    const visibleSeries = getVisibleSeries(chart);
    const visiblePoints = getDataPoints(visibleSeries);
    visiblePoints.forEach((point) => {
        if (point) {
            if (isLabelOverlappingItsShape(point) || intersectsParentLabel(point, visiblePoints)) {
                hideFunction(point);
            }
            else {
                showFunction(point);
            }
        }
    });
}
export default autohideLabelsOverlappingItsShape;
//# sourceMappingURL=autohideLabelsOverlappingItsShape.js.map