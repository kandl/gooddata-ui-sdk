// (C) 2020 GoodData Corporation
import { PointsChartColorStrategy } from "../_chartColoring/pointsChart.js";
export class ScatterPlotColorStrategy extends PointsChartColorStrategy {
    createColorAssignment(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _stackByAttribute, dv) {
        const colorAssignment = this.singleMeasureColorMapping(colorPalette, colorMapping, dv);
        return {
            fullColorAssignment: colorAssignment,
        };
    }
    createPalette(colorPalette, colorAssignment, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stackByAttribute) {
        return super.createSingleColorPalette(colorPalette, colorAssignment, stackByAttribute);
    }
}
//# sourceMappingURL=scatterPlotColoring.js.map