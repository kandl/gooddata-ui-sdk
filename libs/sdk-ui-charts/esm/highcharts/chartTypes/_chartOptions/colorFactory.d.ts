import { IColorPalette, ITheme } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { IColorMapping } from "../../../interfaces/index.js";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
export declare class ColorFactory {
    static getColorStrategy(colorPalette: IColorPalette, colorMapping: IColorMapping[], viewByAttribute: any, viewByParentAttribute: any, stackByAttribute: any, dv: DataViewFacade, type: string, theme?: ITheme): IColorStrategy;
}
//# sourceMappingURL=colorFactory.d.ts.map