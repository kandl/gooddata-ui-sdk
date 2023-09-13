import { PointsChartColorStrategy } from "../_chartColoring/pointsChart.js";
import { IColorPalette } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { IColorAssignment, DataViewFacade } from "@gooddata/sdk-ui";
import { ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";
export declare class BubbleChartColorStrategy extends PointsChartColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
    protected createPalette(colorPalette: IColorPalette, colorAssignment: IColorAssignment[], viewByAttribute: any, stackByAttribute: any): string[];
}
//# sourceMappingURL=bubbleChartColoring.d.ts.map