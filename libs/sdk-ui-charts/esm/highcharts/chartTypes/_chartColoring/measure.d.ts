import { ColorStrategy, ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";
import { IColorPalette } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { DataViewFacade } from "@gooddata/sdk-ui";
export declare class MeasureColorStrategy extends ColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], _viewByAttribute: any, _stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
    private mapColorsFromMeasures;
    private mapMeasureColor;
    private mapColorsFromDerivedMeasure;
    private getDerivedMeasureColorAssignment;
}
//# sourceMappingURL=measure.d.ts.map