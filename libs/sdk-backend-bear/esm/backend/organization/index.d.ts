import { IOrganization, IOrganizations, IOrganizationSettingsService, IOrganizationStylingService, ISecuritySettingsService } from "@gooddata/sdk-backend-spi";
import { IOrganizationDescriptor } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../types/auth.js";
export declare class BearOrganization implements IOrganization {
    private readonly authCall;
    readonly organizationId: string;
    private readonly organizationName?;
    constructor(authCall: BearAuthenticatedCallGuard, organizationId: string, organizationName?: string | undefined);
    getDescriptor(): Promise<IOrganizationDescriptor>;
    securitySettings(): ISecuritySettingsService;
    styling(): IOrganizationStylingService;
    settings(): IOrganizationSettingsService;
}
export declare class BearOrganizations implements IOrganizations {
    private readonly authCall;
    constructor(authCall: BearAuthenticatedCallGuard);
    getCurrentOrganization(): Promise<IOrganization>;
}
//# sourceMappingURL=index.d.ts.map