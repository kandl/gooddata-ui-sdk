import { IColorPalette } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { IColorAssignment, DataViewFacade } from "@gooddata/sdk-ui";
import { AttributeColorStrategy } from "@gooddata/sdk-ui-vis-commons";
export declare class PointsChartColorStrategy extends AttributeColorStrategy {
    protected singleMeasureColorMapping(colorPalette: IColorPalette, colorMapping: IColorMapping[], dv: DataViewFacade): IColorAssignment[];
    protected createSingleColorPalette(colorPalette: IColorPalette, colorAssignment: IColorAssignment[], viewByAttribute: any): string[];
}
//# sourceMappingURL=pointsChart.d.ts.map