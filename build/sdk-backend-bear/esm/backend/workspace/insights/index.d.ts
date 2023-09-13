import { IGetVisualizationClassesOptions, IInsightsQueryOptions, IInsightsQueryResult, IInsightReferences, IInsightReferencing, IWorkspaceInsightsService, SupportedInsightReferenceTypes, IGetInsightOptions } from "@gooddata/sdk-backend-spi";
import { IInsight, IInsightDefinition, IVisualizationClass, ObjRef, IFilter } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceInsights implements IWorkspaceInsightsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getVisualizationClass: (ref: ObjRef) => Promise<IVisualizationClass>;
    getVisualizationClasses: (options?: IGetVisualizationClassesOptions) => Promise<IVisualizationClass[]>;
    getInsight: (ref: ObjRef, options?: IGetInsightOptions) => Promise<IInsight>;
    getVisualizationClassesByVisualizationClassUri: (options?: IGetVisualizationClassesOptions) => Promise<{
        [key: string]: string;
    }>;
    getInsights: (options?: IInsightsQueryOptions) => Promise<IInsightsQueryResult>;
    private getInsightsInner;
    createInsight: (insight: IInsightDefinition) => Promise<IInsight>;
    updateInsight: (insight: IInsight) => Promise<IInsight>;
    deleteInsight: (ref: ObjRef) => Promise<void>;
    openInsightAsReport: (insight: IInsightDefinition) => Promise<string>;
    getInsightReferencedObjects: (insight: IInsight, types?: SupportedInsightReferenceTypes[]) => Promise<IInsightReferences>;
    getInsightReferencingObjects: (ref: ObjRef) => Promise<IInsightReferencing>;
    getInsightWithAddedFilters: <T extends IInsightDefinition>(insight: T, filters: IFilter[]) => Promise<T>;
    private getVisualizationClassByUrl;
    private getInsightWithConvertedVisClass;
}
//# sourceMappingURL=index.d.ts.map