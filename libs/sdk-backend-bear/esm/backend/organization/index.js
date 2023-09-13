// (C) 2021-2022 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { SecuritySettingsService } from "./securitySettings.js";
import { OrganizationStylingService } from "./styling.js";
export class BearOrganization {
    constructor(authCall, organizationId, organizationName) {
        this.authCall = authCall;
        this.organizationId = organizationId;
        this.organizationName = organizationName;
    }
    async getDescriptor() {
        // if we already have the data, no reason to download them again
        if (this.organizationName) {
            return {
                id: this.organizationId,
                title: this.organizationName,
            };
        }
        const accountInfo = await this.authCall((sdk) => sdk.user.getAccountInfo());
        return {
            id: this.organizationId,
            title: accountInfo.organizationName,
        };
    }
    securitySettings() {
        const organizationUri = `/gdc/domains/${this.organizationId}`;
        return new SecuritySettingsService(this.authCall, organizationUri);
    }
    styling() {
        return new OrganizationStylingService();
    }
    settings() {
        throw new NotSupported("Backend does not support organization settings service");
    }
}
export class BearOrganizations {
    constructor(authCall) {
        this.authCall = authCall;
    }
    async getCurrentOrganization() {
        const { organization: { id, name }, } = await this.authCall((sdk) => sdk.organization.getCurrentOrganization());
        return new BearOrganization(this.authCall, id, name);
    }
}
//# sourceMappingURL=index.js.map