import { PointsChartColorStrategy } from "../_chartColoring/pointsChart.js";
import { IColorPalette } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { IColorAssignment, DataViewFacade } from "@gooddata/sdk-ui";
import { ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";
export declare class ScatterPlotColorStrategy extends PointsChartColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], _viewByAttribute: any, _stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
    protected createPalette(colorPalette: IColorPalette, colorAssignment: IColorAssignment[], _viewByAttribute: any, stackByAttribute: any): string[];
}
//# sourceMappingURL=scatterPlotColoring.d.ts.map