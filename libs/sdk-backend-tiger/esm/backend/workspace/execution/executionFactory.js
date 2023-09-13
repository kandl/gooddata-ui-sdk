// (C) 2019-2020 GoodData Corporation
import { TigerPreparedExecution } from "./preparedExecution.js";
import { AbstractExecutionFactory } from "@gooddata/sdk-backend-base";
/*
 * Note: if you come here one day to implement the forInsightByRef because tiger supports execute-by-reference,
 * then you are in for a treat. Check out comments in `tigerFactory` in the root index.
 */
export class TigerExecution extends AbstractExecutionFactory {
    constructor(authCall, workspace, dateFormatter) {
        super(workspace);
        this.authCall = authCall;
        this.dateFormatter = dateFormatter;
    }
    forDefinition(def) {
        return new TigerPreparedExecution(this.authCall, def, this, this.dateFormatter);
    }
}
//# sourceMappingURL=executionFactory.js.map