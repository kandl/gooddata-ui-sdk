import React from "react";
import { IChartConfig } from "../../../../../interfaces/index.js";
import { HeadlineFiredDrillEvent } from "../../interfaces/DrillEvents.js";
import { IBaseHeadlineData } from "../../interfaces/BaseHeadlines.js";
interface IHeadlineProps {
    data: IBaseHeadlineData;
    config?: IChartConfig;
    onDrill?: HeadlineFiredDrillEvent;
    onAfterRender?: () => void;
}
declare const BaseHeadline: React.FC<IHeadlineProps>;
export default BaseHeadline;
//# sourceMappingURL=BaseHeadline.d.ts.map