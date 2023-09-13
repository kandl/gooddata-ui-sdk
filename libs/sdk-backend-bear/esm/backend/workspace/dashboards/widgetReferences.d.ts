import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
import { IWidgetReferences, SupportedWidgetReferenceTypes } from "@gooddata/sdk-backend-spi";
import { IWidget } from "@gooddata/sdk-model";
export declare class WidgetReferencesQuery {
    private readonly authCall;
    private readonly workspace;
    private readonly widget;
    private readonly requestedTypes;
    private readonly objectId;
    private readonly typesForXref;
    private readonly typesForLoad;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string, widget: IWidget, requestedTypes: SupportedWidgetReferenceTypes[]);
    run: () => Promise<IWidgetReferences>;
    /**
     * Uses the query resource to obtain all objects of the desired types which are used by the insight.
     */
    private findReferencedObjects;
    /**
     * Give the discovered references, bulk load data for objects of those types that the caller is interested in.
     */
    private loadObjects;
    private createResult;
}
//# sourceMappingURL=widgetReferences.d.ts.map