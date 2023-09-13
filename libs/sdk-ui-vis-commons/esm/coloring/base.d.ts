import { IColorAssignment, DataViewFacade } from "@gooddata/sdk-ui";
import { IColor, IColorPalette, ITheme } from "@gooddata/sdk-model";
import { IColorMapping } from "./types.js";
/**
 * @internal
 */
export interface IColorStrategy {
    getColorByIndex(index: number): string;
    getColorAssignment(): IColorAssignment[];
    getFullColorAssignment(): IColorAssignment[];
}
/**
 * @internal
 */
export interface ICreateColorAssignmentReturnValue {
    fullColorAssignment: IColorAssignment[];
    outputColorAssignment?: IColorAssignment[];
}
/**
 * @internal
 */
export declare abstract class ColorStrategy implements IColorStrategy {
    protected palette: string[];
    protected fullColorAssignment: IColorAssignment[];
    protected outputColorAssignment: IColorAssignment[];
    protected theme?: ITheme;
    constructor(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, stackByAttribute: any, dv: DataViewFacade, theme?: ITheme);
    getColorByIndex(index: number): string;
    getColorAssignment(): IColorAssignment[];
    getFullColorAssignment(): IColorAssignment[];
    protected createPalette(colorPalette: IColorPalette, colorAssignment: IColorAssignment[], _viewByAttribute: any, _stackByAttribute: any): string[];
    protected abstract createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
}
/**
 * @internal
 */
export declare function isValidMappedColor(colorItem: IColor, colorPalette: IColorPalette): boolean;
/**
 * @internal
 */
export declare function getAttributeColorAssignment(attribute: any, colorPalette: IColorPalette, colorMapping: IColorMapping[], dv: DataViewFacade): IColorAssignment[];
//# sourceMappingURL=base.d.ts.map