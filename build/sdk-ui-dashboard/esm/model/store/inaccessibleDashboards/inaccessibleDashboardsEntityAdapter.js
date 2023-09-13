// (C) 2023 GoodData Corporation
import { createEntityAdapter } from "@reduxjs/toolkit";
import { objRefToString } from "@gooddata/sdk-model";
export const inaccessibleDashboardsEntityAdapter = createEntityAdapter({
    selectId: (dashboard) => objRefToString(dashboard.ref),
});
//# sourceMappingURL=inaccessibleDashboardsEntityAdapter.js.map