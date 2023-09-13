import { IEntitlements } from "@gooddata/sdk-backend-spi";
import { IEntitlementDescriptor } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../types/index.js";
export declare class TigerEntitlements implements IEntitlements {
    private readonly authCall;
    constructor(authCall: TigerAuthenticatedCallGuard);
    resolveEntitlements(): Promise<IEntitlementDescriptor[]>;
}
//# sourceMappingURL=index.d.ts.map