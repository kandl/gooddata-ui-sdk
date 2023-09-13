// (C) 2019-2020 GoodData Corporation
import includes from "lodash/includes.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
const openAsReportSupportingVisualizations = [
    VisualizationTypes.COLUMN,
    VisualizationTypes.BAR,
    VisualizationTypes.LINE,
    VisualizationTypes.PIE,
];
export function isOpenAsReportSupportedByVisualization(type) {
    return includes(openAsReportSupportingVisualizations, type);
}
//# sourceMappingURL=visualizationsHelper.js.map