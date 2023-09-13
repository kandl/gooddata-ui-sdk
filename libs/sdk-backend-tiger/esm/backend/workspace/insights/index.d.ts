import { IInsightsQueryOptions, IInsightsQueryResult, IInsightReferences, IInsightReferencing, IWorkspaceInsightsService, SupportedInsightReferenceTypes, IGetInsightOptions } from "@gooddata/sdk-backend-spi";
import { IInsight, IInsightDefinition, IVisualizationClass, ObjRef, IFilter } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceInsights implements IWorkspaceInsightsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    getVisualizationClass: (ref: ObjRef) => Promise<IVisualizationClass>;
    getVisualizationClasses: () => Promise<IVisualizationClass[]>;
    getInsights: (options?: IInsightsQueryOptions) => Promise<IInsightsQueryResult>;
    private getInsightsRequestParameters;
    getInsight: (ref: ObjRef, options?: IGetInsightOptions) => Promise<IInsight>;
    createInsight: (insight: IInsightDefinition) => Promise<IInsight>;
    updateInsight: (insight: IInsight) => Promise<IInsight>;
    deleteInsight: (ref: ObjRef) => Promise<void>;
    getInsightReferencedObjects: (_insight: IInsight, _types?: SupportedInsightReferenceTypes[]) => Promise<IInsightReferences>;
    getInsightReferencingObjects: (ref: ObjRef) => Promise<IInsightReferencing>;
    getInsightWithAddedFilters: <T extends IInsightDefinition>(insight: T, filters: IFilter[]) => Promise<T>;
}
//# sourceMappingURL=index.d.ts.map