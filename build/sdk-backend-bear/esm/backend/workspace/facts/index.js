// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { convertMetadataObjectXrefEntry } from "../../../convertors/fromBackend/MetaConverter.js";
import { getObjectIdFromUri, objRefToUri } from "../../../utils/api.js";
export class BearWorkspaceFacts {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async getFactDatasetMeta(ref) {
        const uri = await objRefToUri(ref, this.workspace, this.authCall);
        const objectId = getObjectIdFromUri(uri);
        return this.authCall(async (sdk) => {
            const usedBy = await sdk.xhr.getParsed(`/gdc/md/${this.workspace}/usedby2/${objectId}?types=dataSet`);
            invariant(usedBy.entries.length > 0, "Fact must have a dataset associated to it.");
            return convertMetadataObjectXrefEntry("dataSet", usedBy.entries[0]);
        });
    }
}
//# sourceMappingURL=index.js.map