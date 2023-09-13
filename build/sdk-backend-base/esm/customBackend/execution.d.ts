import { AbstractExecutionFactory } from "../toolkit/execution.js";
import { IExecutionDefinition } from "@gooddata/sdk-model";
import { IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { CustomBackendConfig, CustomBackendState } from "./config.js";
/**
 * @internal
 */
export declare class CustomExecutionFactory extends AbstractExecutionFactory {
    private readonly config;
    private readonly state;
    constructor(workspace: string, config: CustomBackendConfig, state: CustomBackendState);
    forDefinition: (def: IExecutionDefinition) => IPreparedExecution;
}
//# sourceMappingURL=execution.d.ts.map