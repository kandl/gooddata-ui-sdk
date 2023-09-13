import { IMeasure, MeasureAggregation } from "@gooddata/sdk-model";
import { IMeasure as IBearMeasure, MeasureAggregation as BearMeasureAggregation } from "@gooddata/api-model-bear";
export declare function convertMeasure(measure: IMeasure): IBearMeasure;
export declare function convertAggregation(aggregation?: MeasureAggregation): BearMeasureAggregation | undefined;
//# sourceMappingURL=MeasureConverter.d.ts.map