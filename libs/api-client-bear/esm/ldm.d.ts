import { XhrModule } from "./xhr.js";
export declare class LdmModule {
    private xhr;
    constructor(xhr: XhrModule);
    /**
     * Get closest connecting attributes in the LDM by calling the "attributeupperbound" endpoint
     *
     * @param projectId - A project identifier
     * @param attributeUris - Input list of attribute URIs
     * @returns Resolves with result list of attribute URIs
     */
    getCommonAttributes(projectId: string, attributeUris: ReadonlyArray<string>): Promise<string[]>;
}
//# sourceMappingURL=ldm.d.ts.map