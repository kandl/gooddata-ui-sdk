import { IEntitlementDescriptor } from "@gooddata/sdk-model";
/**
 * Provides functions to obtain entitlements
 *
 * @public
 */
export interface IEntitlements {
    /**
     * Returns current license entitlements
     */
    resolveEntitlements(): Promise<IEntitlementDescriptor[]>;
}
//# sourceMappingURL=index.d.ts.map