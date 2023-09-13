import { IAttributeOrMeasure, IBucket, IExecutionDefinition } from "@gooddata/sdk-model";
import { IChartConfig } from "../../interfaces/index.js";
export declare function sanitizeConfig(input?: IAttributeOrMeasure[] | IBucket[], config?: IChartConfig): IChartConfig;
export declare function getSanitizedStackingConfig(executionDef: IExecutionDefinition, chartConfig: IChartConfig): IChartConfig;
//# sourceMappingURL=sanitizeStacking.d.ts.map