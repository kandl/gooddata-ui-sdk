import React from "react";
import { IColorLegendBox, IHeatmapLegendLabel as IColorLegendLabel } from "./helpers.js";
import { IColorLegendItem, IColorLegendSize } from "./types.js";
import { ITheme } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface IColorLegendProps {
    data: IColorLegendItem[];
    numericSymbols: string[];
    position: string;
    size?: IColorLegendSize;
    format?: string;
    theme?: ITheme;
    title?: string;
}
interface IColorLabelsProps {
    labels: IColorLegendLabel[];
}
interface IColorBoxesProps {
    boxes: IColorLegendBox[];
}
export declare function ColorLabels(colorLabelProps: IColorLabelsProps): JSX.Element;
export declare function ColorBoxes(colorBoxProps: IColorBoxesProps): JSX.Element;
/**
 * @internal
 */
export declare const ColorLegend: React.ComponentType<Omit<IColorLegendProps, "theme" | "themeIsLoading">>;
export {};
//# sourceMappingURL=ColorLegend.d.ts.map