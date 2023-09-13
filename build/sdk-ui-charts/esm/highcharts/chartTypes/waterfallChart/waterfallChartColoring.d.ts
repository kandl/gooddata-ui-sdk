import { ColorStrategy, IColorMapping, ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";
import { IColorPalette } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
export declare class WaterfallChartColorStrategy extends ColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], _viewByParentAttribute: any, _viewByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
}
//# sourceMappingURL=waterfallChartColoring.d.ts.map