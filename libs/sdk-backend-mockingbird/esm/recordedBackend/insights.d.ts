import { IInsightsQueryOptions, IInsightsQueryResult, IInsightReferences, IInsightReferencing, IWorkspaceInsightsService, SupportedInsightReferenceTypes } from "@gooddata/sdk-backend-spi";
import { RecordedRefType, RecordingIndex } from "./types.js";
import { IInsight, IInsightDefinition, IVisualizationClass, ObjRef, IFilter } from "@gooddata/sdk-model";
/**
 * Note: the impl always makes / gives clones of recorded insights to prevent mutable operations
 * impacting the recordings and thus violate client-server interaction integrity (client mutates, server
 * suddenly starts returning modified data for everyone)
 *
 * @internal
 */
export declare class RecordedInsights implements IWorkspaceInsightsService {
    private readonly insightRefType;
    private readonly insights;
    private readonly visClasses;
    constructor(recordings: RecordingIndex, insightRefType: RecordedRefType);
    createInsight(def: IInsightDefinition): Promise<IInsight>;
    getInsight(ref: ObjRef): Promise<IInsight>;
    getInsights(query?: IInsightsQueryOptions): Promise<IInsightsQueryResult>;
    updateInsight(insight: IInsight): Promise<IInsight>;
    deleteInsight(ref: ObjRef): Promise<void>;
    getVisualizationClass(ref: ObjRef): Promise<IVisualizationClass>;
    getVisualizationClasses(): Promise<IVisualizationClass[]>;
    getInsightReferencedObjects: (_insight: IInsight, _types?: SupportedInsightReferenceTypes[]) => Promise<IInsightReferences>;
    getInsightReferencingObjects: (_ref: ObjRef) => Promise<IInsightReferencing>;
    getInsightWithAddedFilters: <T extends IInsightDefinition>(insight: T, filters: IFilter[]) => Promise<T>;
    private createInsightWithRef;
    private createRef;
    private getVisualizationClassByUri;
    private getVisualizationClassById;
}
//# sourceMappingURL=insights.d.ts.map