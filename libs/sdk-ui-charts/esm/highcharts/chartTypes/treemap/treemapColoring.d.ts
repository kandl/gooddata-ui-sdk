import { MeasureColorStrategy } from "../_chartColoring/measure.js";
import { IColorPalette } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";
export declare class TreemapColorStrategy extends MeasureColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
}
//# sourceMappingURL=treemapColoring.d.ts.map