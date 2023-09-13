import { ColorStrategy, IColorMapping, ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";
import { IColorPalette } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
export declare class SankeyChartColorStrategy extends ColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], fromAttribute: any, toAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
}
//# sourceMappingURL=sankeyChartColoring.d.ts.map