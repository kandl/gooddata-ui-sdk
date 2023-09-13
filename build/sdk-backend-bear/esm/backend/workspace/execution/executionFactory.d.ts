import { IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { IExecutionDefinition, IInsight, INullableFilter } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
import { AbstractExecutionFactory } from "@gooddata/sdk-backend-base";
export declare class BearExecution extends AbstractExecutionFactory {
    private readonly authCall;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    forDefinition(def: IExecutionDefinition): IPreparedExecution;
    forInsightByRef(insight: IInsight, filters?: INullableFilter[]): IPreparedExecution;
}
//# sourceMappingURL=executionFactory.d.ts.map