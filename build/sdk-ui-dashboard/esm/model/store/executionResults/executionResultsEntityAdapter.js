// (C) 2021 GoodData Corporation
import { createEntityAdapter } from "@reduxjs/toolkit";
export const executionResultsAdapter = createEntityAdapter({
    selectId: (execution) => execution.id,
});
//# sourceMappingURL=executionResultsEntityAdapter.js.map