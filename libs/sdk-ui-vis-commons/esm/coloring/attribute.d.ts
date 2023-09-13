import { IColorPalette } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { ColorStrategy, ICreateColorAssignmentReturnValue } from "./base.js";
import { IColorMapping } from "./types.js";
/**
 * @internal
 */
export declare class AttributeColorStrategy extends ColorStrategy {
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
}
//# sourceMappingURL=attribute.d.ts.map