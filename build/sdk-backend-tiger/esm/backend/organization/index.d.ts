import { IOrganization, IOrganizations, IOrganizationSettingsService, IOrganizationStylingService, ISecuritySettingsService } from "@gooddata/sdk-backend-spi";
import { IOrganizationDescriptor } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../types/index.js";
export declare class TigerOrganization implements IOrganization {
    private readonly authCall;
    readonly organizationId: string;
    readonly organizationName?: string | undefined;
    constructor(authCall: TigerAuthenticatedCallGuard, organizationId: string, organizationName?: string | undefined);
    getDescriptor(): Promise<IOrganizationDescriptor>;
    securitySettings(): ISecuritySettingsService;
    styling(): IOrganizationStylingService;
    settings(): IOrganizationSettingsService;
}
export declare class TigerOrganizations implements IOrganizations {
    private readonly authCall;
    constructor(authCall: TigerAuthenticatedCallGuard);
    getCurrentOrganization(): Promise<IOrganization>;
}
//# sourceMappingURL=index.d.ts.map