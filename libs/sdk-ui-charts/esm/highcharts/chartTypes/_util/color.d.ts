import { IChartConfig } from "../../../interfaces/index.js";
import { IRgbColorValue, IColorPalette } from "@gooddata/sdk-model";
export declare const WHITE = "rgb(255, 255, 255)";
export declare const BLACK = "rgb(0, 0, 0)";
export declare const GRAY = "rgb(201, 213, 223)";
export declare const AXIS_LINE_COLOR = "#d5d5d5";
export declare const TRANSPARENT = "transparent";
export declare const HEATMAP_BLUE_COLOR_PALETTE: string[];
export declare const DEFAULT_HEATMAP_BLUE_COLOR: IRgbColorValue;
export declare const DEFAULT_HEATMAP_BLUE_BASE_COLOR: IRgbColorValue;
export declare const DEFAULT_BULLET_GRAY_COLOR: IRgbColorValue;
export declare const DEFAULT_WATERFALL_COLORS: string[];
/**
 * @internal
 */
export declare function getValidColorPalette(config: IChartConfig): IColorPalette;
//# sourceMappingURL=color.d.ts.map