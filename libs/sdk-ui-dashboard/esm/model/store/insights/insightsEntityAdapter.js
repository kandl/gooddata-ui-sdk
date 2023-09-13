// (C) 2021 GoodData Corporation
import { createEntityAdapter } from "@reduxjs/toolkit";
import { insightRef, serializeObjRef } from "@gooddata/sdk-model";
export const insightsAdapter = createEntityAdapter({
    selectId: (insight) => serializeObjRef(insightRef(insight)),
});
//# sourceMappingURL=insightsEntityAdapter.js.map