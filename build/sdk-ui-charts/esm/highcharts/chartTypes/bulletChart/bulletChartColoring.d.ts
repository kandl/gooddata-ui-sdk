import { IColorPalette, IColor, IMeasureDescriptor } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { IColorAssignment, DataViewFacade } from "@gooddata/sdk-ui";
import { ColorStrategy, ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";
declare class BulletChartColorStrategy extends ColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], _viewByAttribute: any, _stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
    protected createPalette(colorPalette: IColorPalette, colorAssignments: IColorAssignment[]): string[];
    protected mapMeasureColor(headerItem: IMeasureDescriptor, colorPalette: IColorPalette, colorMapping: IColorMapping[], dv: DataViewFacade, defaultColorsAssignment: IColorAssignment[]): IColor;
    private getDefaultColorAssignment;
}
export default BulletChartColorStrategy;
//# sourceMappingURL=bulletChartColoring.d.ts.map