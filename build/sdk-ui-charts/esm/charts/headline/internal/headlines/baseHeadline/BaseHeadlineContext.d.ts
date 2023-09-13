/// <reference types="react" />
import { IChartConfig } from "../../../../../interfaces/index.js";
import { FiredDrillEventCallback } from "../../interfaces/DrillEvents.js";
interface IBaseHeadlineContextData {
    clientWidth: number;
    clientHeight: number;
    config: IChartConfig;
    fireDrillEvent: FiredDrillEventCallback;
}
export declare const BaseHeadlineContext: import("react").Context<IBaseHeadlineContextData>;
export declare const useBaseHeadline: () => IBaseHeadlineContextData;
export {};
//# sourceMappingURL=BaseHeadlineContext.d.ts.map