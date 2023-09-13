import { XhrModule } from "./xhr.js";
import { IOrganization } from "@gooddata/api-model-bear";
export declare class OrganizationModule {
    private xhr;
    constructor(xhr: XhrModule);
    /**
     * Get current user's organization
     * @returns resolves with current user's organization
     */
    getCurrentOrganization(): Promise<IOrganization>;
}
//# sourceMappingURL=organization.d.ts.map