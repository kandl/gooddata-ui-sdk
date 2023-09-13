// (C) 2021-2022 GoodData Corporation
import { createEntityAdapter } from "@reduxjs/toolkit";
import { objRefToString } from "@gooddata/sdk-model";
export const listedDashboardsEntityAdapter = createEntityAdapter({
    selectId: (dashboard) => objRefToString(dashboard.ref),
});
//# sourceMappingURL=listedDashboardsEntityAdapter.js.map