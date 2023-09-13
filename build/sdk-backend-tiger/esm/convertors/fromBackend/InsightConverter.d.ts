import { JsonApiVisualizationObjectOutWithLinks, JsonApiAnalyticalDashboardOutIncludes, JsonApiMetricOutIncludes } from "@gooddata/api-client-tiger";
import { IInsight, IInsightDefinition, IUser } from "@gooddata/sdk-model";
export declare const insightFromInsightDefinition: (insight: IInsightDefinition, id: string, uri: string, tags: string[] | undefined, isLocked: boolean | undefined, created: string | undefined, updated: string | undefined, createdBy: IUser | undefined, updatedBy: IUser | undefined) => IInsight;
export declare const visualizationObjectsItemToInsight: (visualizationObject: JsonApiVisualizationObjectOutWithLinks, included?: (JsonApiAnalyticalDashboardOutIncludes | JsonApiMetricOutIncludes)[]) => IInsight;
//# sourceMappingURL=InsightConverter.d.ts.map