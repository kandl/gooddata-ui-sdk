import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
import { IInsight } from "@gooddata/sdk-model";
import { IInsightReferences, InsightReferenceTypes } from "@gooddata/sdk-backend-spi";
export declare class InsightReferencesQuery {
    private readonly authCall;
    private readonly workspace;
    private readonly insight;
    private readonly requestedTypes;
    private readonly objectId;
    private readonly typesForXref;
    private readonly typesForLoad;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string, insight: IInsight, requestedTypes: InsightReferenceTypes[]);
    run: () => Promise<IInsightReferences>;
    /**
     * Uses the query resource to obtain all objects of the desired types which are used by the insight.
     */
    private findReferencedObjects;
    /**
     * Given objects used by the insight, retrieve dataSets to which they belong. The usedBy2 is bulk mode
     * is used for this.
     */
    private findDatasets;
    /**
     * Give the discovered references, bulk load data for objects of those types that the caller is interested in.
     */
    private loadObjects;
    private createResult;
}
//# sourceMappingURL=insightReferences.d.ts.map