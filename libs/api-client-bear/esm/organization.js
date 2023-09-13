// (C) 2022 GoodData Corporation
export class OrganizationModule {
    constructor(xhr) {
        this.xhr = xhr;
    }
    /**
     * Get current user's organization
     * @returns resolves with current user's organization
     */
    getCurrentOrganization() {
        return this.xhr.getParsed("/gdc/app/organization/current");
    }
}
//# sourceMappingURL=organization.js.map