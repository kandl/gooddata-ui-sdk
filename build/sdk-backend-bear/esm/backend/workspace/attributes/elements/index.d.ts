import { IElementsQueryFactory, IElementsQuery, IFilterElementsQuery } from "@gooddata/sdk-backend-spi";
import { IAttributeFilter, IRelativeDateFilter, ObjRef } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../../types/auth.js";
export declare class BearWorkspaceElements implements IElementsQueryFactory {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    forDisplayForm(ref: ObjRef): IElementsQuery;
    forFilter(filter: IAttributeFilter | IRelativeDateFilter, dateFilterDisplayForm?: ObjRef): IFilterElementsQuery;
}
//# sourceMappingURL=index.d.ts.map