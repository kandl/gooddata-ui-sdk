// (C) 2020 GoodData Corporation
import { PointsChartColorStrategy } from "../_chartColoring/pointsChart.js";
export class BubbleChartColorStrategy extends PointsChartColorStrategy {
    createColorAssignment(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stackByAttribute, dv) {
        let colorAssignment;
        if (stackByAttribute) {
            colorAssignment = super.createColorAssignment(colorPalette, colorMapping, viewByAttribute, stackByAttribute, dv).fullColorAssignment;
        }
        else {
            colorAssignment = this.singleMeasureColorMapping(colorPalette, colorMapping, dv);
        }
        return {
            fullColorAssignment: colorAssignment,
        };
    }
    createPalette(colorPalette, colorAssignment, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stackByAttribute) {
        if (stackByAttribute) {
            return super.createPalette(colorPalette, colorAssignment, viewByAttribute, stackByAttribute);
        }
        return super.createSingleColorPalette(colorPalette, colorAssignment, stackByAttribute);
    }
}
//# sourceMappingURL=bubbleChartColoring.js.map