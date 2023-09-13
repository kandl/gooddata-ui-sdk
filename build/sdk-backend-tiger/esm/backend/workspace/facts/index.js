import { isIdentifierRef } from "@gooddata/sdk-model";
import { jsonApiHeaders } from "@gooddata/api-client-tiger";
import { invariant } from "ts-invariant";
import { convertDatasetWithLinks } from "../../../convertors/fromBackend/MetadataConverter.js";
export class TigerWorkspaceFacts {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async getFactDatasetMeta(ref) {
        return this.authCall((client) => {
            return loadFactDataset(client, this.workspace, ref);
        });
    }
}
function loadFactDataset(client, workspace, ref) {
    invariant(isIdentifierRef(ref), "tiger backend only supports referencing by identifier");
    return client.entities
        .getEntityFacts({
        workspaceId: workspace,
        objectId: ref.identifier,
        include: ["datasets"],
    }, {
        headers: jsonApiHeaders,
    })
        .then((res) => {
        // if this happens then its either bad query parameterization or the backend is hosed badly
        invariant(res.data.included && res.data.included.length > 0, "server returned that fact does not belong to any dataset");
        return convertDatasetWithLinks(res.data.included[0]);
    });
}
//# sourceMappingURL=index.js.map