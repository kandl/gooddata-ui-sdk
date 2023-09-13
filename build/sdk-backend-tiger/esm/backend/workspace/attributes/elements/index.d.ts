import { FilterWithResolvableElements, IElementsQuery, IElementsQueryFactory, IFilterElementsQuery } from "@gooddata/sdk-backend-spi";
import { ObjRef } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../../types/index.js";
import { DateFormatter } from "../../../../convertors/fromBackend/dateFormatting/types.js";
export declare class TigerWorkspaceElements implements IElementsQueryFactory {
    private readonly authCall;
    readonly workspace: string;
    private readonly dateFormatter;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string, dateFormatter: DateFormatter);
    forDisplayForm(ref: ObjRef): IElementsQuery;
    forFilter(filter: FilterWithResolvableElements): IFilterElementsQuery;
}
//# sourceMappingURL=index.d.ts.map