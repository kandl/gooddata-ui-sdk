import { IEntitlementDescriptor } from "@gooddata/sdk-model";
import { DashboardSelector } from "../types.js";
import { ResolvedEntitlements } from "../../types/commonTypes.js";
/**
 * Returns dashboard's entitlements.
 *
 * @remarks
 * It is expected that the selector is called only after the entitlements state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @alpha
 */
export declare const selectEntitlements: DashboardSelector<ResolvedEntitlements>;
/**
 * @alpha
 */
export declare const selectEntitlementExportPdf: DashboardSelector<IEntitlementDescriptor | undefined>;
