// (C) 2021-2023 GoodData Corporation
import { createEntityAdapter } from "@reduxjs/toolkit";
import { serializeObjRef } from "@gooddata/sdk-model";
import { objRef } from "../../utils/objRef.js";
export const drillTargetsAdapter = createEntityAdapter({
    selectId: (drillTargets) => serializeObjRef(getIdFromDrillTargets(drillTargets)),
});
const getIdFromDrillTargets = (targets) => {
    return objRef(targets.uri, targets.identifier);
};
//# sourceMappingURL=drillTargetsEntityAdapter.js.map