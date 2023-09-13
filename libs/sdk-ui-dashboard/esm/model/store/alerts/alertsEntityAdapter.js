// (C) 2021-2022 GoodData Corporation
import { createEntityAdapter } from "@reduxjs/toolkit";
import { objRefToString } from "@gooddata/sdk-model";
export const alertsAdapter = createEntityAdapter({
    selectId: (alert) => objRefToString(alert.ref),
});
//# sourceMappingURL=alertsEntityAdapter.js.map