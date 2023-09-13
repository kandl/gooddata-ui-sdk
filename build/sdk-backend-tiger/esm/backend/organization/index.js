// (C) 2021-2022 GoodData Corporation
import { SecuritySettingsService } from "./securitySettings.js";
import { OrganizationStylingService } from "./styling.js";
import { OrganizationSettingsService } from "./settings.js";
export class TigerOrganization {
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
        const { organizationName, organizationId } = await this.authCall((client) => client.profile.getCurrent());
        return {
            id: organizationId,
            title: organizationName,
        };
    }
    securitySettings() {
        return new SecuritySettingsService(this.organizationId);
    }
    styling() {
        return new OrganizationStylingService(this.authCall);
    }
    settings() {
        return new OrganizationSettingsService(this.authCall);
    }
}
export class TigerOrganizations {
    constructor(authCall) {
        this.authCall = authCall;
    }
    async getCurrentOrganization() {
        const { organizationName, organizationId } = await this.authCall((client) => client.profile.getCurrent());
        return new TigerOrganization(this.authCall, organizationId, organizationName);
    }
}
//# sourceMappingURL=index.js.map