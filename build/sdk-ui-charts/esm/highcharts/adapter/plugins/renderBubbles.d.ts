import Highcharts from "../../lib/index.js";
import { IHighchartsAxisExtend } from "../../typings/extend.js";
import { SeriesMapbubbleOptions } from "highcharts";
export interface IBubbleAxis extends IHighchartsAxisExtend {
    allowZoomOutside?: boolean;
    dataMin?: number;
    dataMax?: number;
    options?: any;
    userMin?: number;
    userMax?: number;
}
export interface IBubbleSeries extends Highcharts.Series {
    bubblePadding?: boolean;
    minPxSize?: number;
    maxPxSize?: number;
    zData?: Array<number | null>;
    radii?: Array<number | null>;
    getRadii(zMin: number, zMax: number, series: Highcharts.Series): number | null;
    options: SeriesMapbubbleOptions;
    xData?: Array<number | null>;
    yData?: Array<number | null>;
}
export declare function renderBubbles(HighchartsInstance: any): void;
//# sourceMappingURL=renderBubbles.d.ts.map