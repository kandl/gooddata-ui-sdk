export class LdmModule {
    constructor(xhr) {
        this.xhr = xhr;
    }
    /**
     * Get closest connecting attributes in the LDM by calling the "attributeupperbound" endpoint
     *
     * @param projectId - A project identifier
     * @param attributeUris - Input list of attribute URIs
     * @returns Resolves with result list of attribute URIs
     */
    getCommonAttributes(projectId, attributeUris) {
        return this.xhr
            .post(`/gdc/md/${projectId}/ldm/attributeupperbound`, {
            body: {
                attributeUpperBounds: {
                    attributes: attributeUris,
                },
            },
        })
            .then((response) => response.getData())
            .then((data) => {
            if (data.attributeUpperBoundsResponse) {
                return data.attributeUpperBoundsResponse.upperbounds;
            }
        });
    }
}
//# sourceMappingURL=ldm.js.map