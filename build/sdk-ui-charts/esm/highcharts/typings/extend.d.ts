import Highcharts from "../lib/index.js";
export type IHighchartsAxis = Partial<Highcharts.Axis> & Partial<Highcharts.ExtremesObject> & Highcharts.ChartParallelAxesOptions;
export interface IHighchartsAxisExtend extends IHighchartsAxis {
    len?: number | null;
    transA?: number;
    translationSlope?: number;
    options?: Highcharts.YAxisOptions;
    chart?: any;
    translate?(val: number, backwards: number | boolean, cvsCoord: number | boolean, old: number | boolean, handleLog: number | boolean, pointPlacement?: number): number | undefined;
}
//# sourceMappingURL=extend.d.ts.map