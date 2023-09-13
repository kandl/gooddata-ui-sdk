import { DrillFromType, IDrillDefinition, IWrappedKPI } from "@gooddata/api-model-bear";
import { DrillOrigin, IDrillToLegacyDashboard, InsightDrillDefinition } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare const convertKpiDrill: (kpi: IWrappedKPI) => IDrillToLegacyDashboard;
/**
 * @internal
 */
export declare const convertDrillOrigin: (from: DrillFromType) => DrillOrigin;
/**
 * @internal
 */
export declare const convertVisualizationWidgetDrill: (drill: IDrillDefinition) => InsightDrillDefinition;
//# sourceMappingURL=drills.d.ts.map