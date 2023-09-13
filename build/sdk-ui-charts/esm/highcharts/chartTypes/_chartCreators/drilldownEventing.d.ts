import { ChartElementType, ChartType, VisType, IDrillConfig } from "@gooddata/sdk-ui";
import Highcharts from "../../lib/index.js";
import { IHighchartsPointObject } from "./isGroupHighchartsDrillEvent.js";
export declare function getClickableElementNameByChartType(type: VisType): ChartElementType;
export declare function chartClick(drillConfig: IDrillConfig, event: Highcharts.DrilldownEventObject, target: EventTarget, chartType: ChartType): void;
export declare function tickLabelClick(drillConfig: IDrillConfig, points: IHighchartsPointObject[], target: EventTarget, chartType: ChartType): void;
//# sourceMappingURL=drilldownEventing.d.ts.map