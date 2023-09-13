// (C) 2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { invariant } from "ts-invariant";
const selectSelf = createSelector((state) => state, (state) => state.entitlements);
/**
 * Returns dashboard's entitlements.
 *
 * @remarks
 * It is expected that the selector is called only after the entitlements state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @alpha
 */
export const selectEntitlements = createSelector(selectSelf, (state) => {
    invariant(state.entitlements, "attempting to access uninitialized entitlements state");
    return state.entitlements;
});
/**
 * @alpha
 */
export const selectEntitlementExportPdf = createSelector(selectEntitlements, (entitlements) => {
    return entitlements.find((entitlement) => entitlement.name === "PdfExports");
});
//# sourceMappingURL=entitlementsSelectors.js.map