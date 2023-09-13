import { ColorStrategy, ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";
import { IColorPalette } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { IColorAssignment, DataViewFacade } from "@gooddata/sdk-ui";
export declare class HeatmapColorStrategy extends ColorStrategy {
    getColorByIndex(index: number): string;
    protected createColorAssignment(colorPalette: IColorPalette, colorMapping: IColorMapping[], _viewByAttribute: any, _stackByAttribute: any, dv: DataViewFacade): ICreateColorAssignmentReturnValue;
    private getThemeBackgroundColor;
    private getBackgroundColor;
    protected createPalette(colorPalette: IColorPalette, colorAssignment: IColorAssignment[]): string[];
    private getCustomHeatmapColorPalette;
    private generatePalette;
    private getDefaultColorAssignment;
}
//# sourceMappingURL=heatmapColoring.d.ts.map