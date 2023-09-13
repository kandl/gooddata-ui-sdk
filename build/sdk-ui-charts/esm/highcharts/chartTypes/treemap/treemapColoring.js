// (C) 2020-2022 GoodData Corporation
import { MeasureColorStrategy } from "../_chartColoring/measure.js";
import { getAttributeColorAssignment } from "@gooddata/sdk-ui-vis-commons";
export class TreemapColorStrategy extends MeasureColorStrategy {
    createColorAssignment(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stackByAttribute, dv) {
        let colorAssignment;
        if (viewByAttribute) {
            colorAssignment = getAttributeColorAssignment(viewByAttribute, colorPalette, colorMapping, dv);
        }
        else {
            const result = super.createColorAssignment(colorPalette, colorMapping, viewByAttribute, stackByAttribute, dv);
            colorAssignment = result.outputColorAssignment;
        }
        return {
            fullColorAssignment: colorAssignment,
            outputColorAssignment: colorAssignment,
        };
    }
}
//# sourceMappingURL=treemapColoring.js.map