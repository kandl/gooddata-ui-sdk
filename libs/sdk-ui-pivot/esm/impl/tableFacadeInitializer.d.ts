import { TableConfigAccessors, TableDataCallbacks, TableLegacyCallbacks } from "./privateTypes.js";
import { IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { ICorePivotTableProps } from "../publicTypes.js";
import { TableFacade } from "./tableFacade.js";
export type InitializerResult = {
    initializer: TableFacadeInitializer;
    table: TableFacade;
};
export declare class TableFacadeInitializer {
    private readonly execution;
    private readonly tableMethods;
    private readonly props;
    private abandoned;
    constructor(execution: IPreparedExecution, tableMethods: TableDataCallbacks & TableLegacyCallbacks & TableConfigAccessors, props: Readonly<ICorePivotTableProps>);
    /**
     * Abandon the initialization. This will not cancel any requests that may be already in-flight. It will
     * ensure though that no events will be emitted and that the initalization ends with `undefined` result.
     */
    abandon: () => void;
    /**
     * Tests whether the other execution is the same as the one used by the initializer.
     *
     * @param other - other execution to test
     */
    isSameExecution(other: IPreparedExecution): boolean;
    /**
     * Drives initialization of the table facade. The initialization will emit all the essential
     * loading, error, onExportReady and pushData events using the callback functions specified in the {@link TableDataCallbacks}.
     *
     * If the initialization was abandoned at the right time, the result is 'undefined'. Otherwise the result
     * contains pointer to the initializer instance and the table facade itself.
     *
     * To prevent race conditions in situations when caller may create, start and abandon multiple initializations,
     * it is essential for the caller to check that the initialization result belongs to the currently active
     * initializer.
     */
    initialize: () => Promise<InitializerResult | undefined>;
    private createTableFacade;
}
//# sourceMappingURL=tableFacadeInitializer.d.ts.map