import { IAfm } from "@gooddata/api-model-bear";
import { ObjRef, IMeasure, IRelativeDateFilter } from "@gooddata/sdk-model";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../../../types/auth.js";
export declare class LimitingAfmFactory {
    private readonly authCall;
    private readonly displayFormRef;
    private readonly workspace;
    constructor(authCall: BearAuthenticatedCallGuard, displayFormRef: ObjRef, workspace: string);
    getAfm: (filters: IElementsQueryAttributeFilter[] | undefined, measures: IMeasure[] | undefined, relativeDateFilters: IRelativeDateFilter[] | undefined) => Promise<IAfm | undefined>;
    private createFiltersExpressionFromAttributeFilters;
    private getIdentifierUriPairs;
    private getAllIdentifiersUsedInAttributeFilters;
    private getDisplayFormAttributeUriMapping;
}
//# sourceMappingURL=limitingAfmFactory.d.ts.map