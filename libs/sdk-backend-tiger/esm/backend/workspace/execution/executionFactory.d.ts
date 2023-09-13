import { IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { IExecutionDefinition } from "@gooddata/sdk-model";
import { AbstractExecutionFactory, AuthenticatedCallGuard } from "@gooddata/sdk-backend-base";
import { DateFormatter } from "../../../convertors/fromBackend/dateFormatting/types.js";
export declare class TigerExecution extends AbstractExecutionFactory {
    private readonly authCall;
    private readonly dateFormatter;
    constructor(authCall: AuthenticatedCallGuard, workspace: string, dateFormatter: DateFormatter);
    forDefinition(def: IExecutionDefinition): IPreparedExecution;
}
//# sourceMappingURL=executionFactory.d.ts.map