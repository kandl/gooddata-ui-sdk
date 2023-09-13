// (C) 2022 GoodData Corporation
import update from "lodash/fp/update.js";
import { getDrillToCustomUrlPaths } from "../../toBackend/AnalyticalDashboardConverter.js";
import isEmpty from "lodash/isEmpty.js";
import { joinDrillUrlParts } from "@gooddata/sdk-model/internal";
function convertTargetUrlPartsToString(drill) {
    return update(["target", "url"], joinDrillUrlParts, drill);
}
export function convertDrillToCustomUrlInLayoutFromBackend(layout) {
    if (!layout) {
        return;
    }
    const paths = getDrillToCustomUrlPaths(layout);
    if (isEmpty(paths)) {
        return layout;
    }
    return paths.reduce((layout, path) => {
        return update(path, convertTargetUrlPartsToString, layout);
    }, layout);
}
//# sourceMappingURL=DrillToCustomUrlConverter.js.map