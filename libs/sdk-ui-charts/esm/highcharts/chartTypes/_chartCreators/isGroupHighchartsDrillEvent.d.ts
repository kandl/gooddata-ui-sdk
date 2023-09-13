import Highcharts from "../../lib/index.js";
import { IDrillEventIntersectionElement } from "@gooddata/sdk-ui";
export interface IHighchartsPointObject extends Highcharts.Point {
    drillIntersection: IDrillEventIntersectionElement[];
    z?: number;
    value?: number;
    isNullTarget?: boolean;
    target?: number;
    ignoredInDrillEventContext?: boolean;
}
export declare function isGroupHighchartsDrillEvent(event: Highcharts.DrilldownEventObject): boolean;
//# sourceMappingURL=isGroupHighchartsDrillEvent.d.ts.map