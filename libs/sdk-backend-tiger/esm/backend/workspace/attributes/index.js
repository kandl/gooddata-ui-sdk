// (C) 2019-2022 GoodData Corporation
import { NotSupported, UnexpectedResponseError, } from "@gooddata/sdk-backend-spi";
import { areObjRefsEqual, isIdentifierRef, } from "@gooddata/sdk-model";
import { TigerWorkspaceElements } from "./elements/index.js";
import { jsonApiHeaders, MetadataUtilities, JsonApiDatasetOutWithLinksTypeEnum, } from "@gooddata/api-client-tiger";
import flatMap from "lodash/flatMap.js";
import { invariant } from "ts-invariant";
import { convertAttributesWithSideloadedLabels, convertAttributeWithSideloadedLabels, convertDatasetWithLinks, } from "../../../convertors/fromBackend/MetadataConverter.js";
import { getIdOrigin } from "../../../convertors/fromBackend/ObjectInheritance.js";
export class TigerWorkspaceAttributes {
    constructor(authCall, workspace, dateFormatter) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.dateFormatter = dateFormatter;
        this.getAttributeDisplayForm = async (ref) => {
            return this.authCall(async (client) => loadAttributeDisplayForm(client, this.workspace, ref));
        };
        this.getAttribute = async (ref) => {
            return this.authCall(async (client) => loadAttribute(client, this.workspace, ref));
        };
    }
    elements() {
        return new TigerWorkspaceElements(this.authCall, this.workspace, this.dateFormatter);
    }
    getAttributeDisplayForms(refs) {
        return this.authCall(async (client) => {
            const allAttributes = await loadAttributes(client, this.workspace);
            return flatMap(allAttributes, (attr) => attr.displayForms).filter((df) => refs.find((ref) => areObjRefsEqual(ref, df.ref)));
        });
    }
    getAttributeByDisplayForm(ref) {
        return this.authCall(async (client) => loadAttributeByDisplayForm(client, this.workspace, ref));
    }
    getAttributes(refs) {
        return this.authCall(async (client) => {
            const allAttributes = await loadAttributes(client, this.workspace);
            return allAttributes.filter((attr) => refs.find((ref) => areObjRefsEqual(ref, attr.ref)));
        });
    }
    getCommonAttributes() {
        throw new NotSupported("not supported");
    }
    getCommonAttributesBatch() {
        throw new NotSupported("not supported");
    }
    getAttributeDatasetMeta(ref) {
        return this.authCall((client) => {
            return loadAttributeDataset(client, this.workspace, ref);
        });
    }
}
async function loadAttributeDisplayForm(client, workspaceId, ref) {
    invariant(isIdentifierRef(ref), "tiger backend only supports referencing by identifier");
    const attributeRes = await getAllEntitiesAttributesWithFilter(client, workspaceId, ref, [
        "labels",
        "defaultView",
    ]);
    if (!attributeRes.data.data.length) {
        throw new UnexpectedResponseError(`The displayForm with id ${ref.identifier} was not found`, 404, attributeRes);
    }
    const attributes = convertAttributesWithSideloadedLabels(attributeRes.data);
    const matchingLabel = findLabelInAttributes(attributes, ref);
    invariant(matchingLabel, "inconsistent server response, RSQL matched but ref matching did not");
    return matchingLabel;
}
function findLabelInAttributes(attributes, ref) {
    for (const attr of attributes) {
        for (const df of attr.displayForms) {
            if (areObjRefsEqual(df.ref, ref)) {
                return df;
            }
        }
    }
    return undefined;
}
function loadAttribute(client, workspaceId, ref) {
    invariant(isIdentifierRef(ref), "tiger backend only supports referencing by identifier");
    return client.entities
        .getEntityAttributes({
        workspaceId,
        objectId: ref.identifier,
        include: ["labels", "defaultView"],
    }, {
        headers: jsonApiHeaders,
    })
        .then((res) => convertAttributeWithSideloadedLabels(res.data));
}
function loadAttributeByDisplayForm(client, workspaceId, ref) {
    invariant(isIdentifierRef(ref), "tiger backend only supports referencing by identifier");
    return getAllEntitiesAttributesWithFilter(client, workspaceId, ref, ["labels"]).then((res) => {
        const convertedAttributes = convertAttributesWithSideloadedLabels(res.data);
        const match = convertedAttributes.find((attr) => attr.displayForms.some((df) => df.id === ref.identifier));
        if (!match) {
            throw new UnexpectedResponseError(`The displayForm with id ${ref.identifier} was not found`, 404, res);
        }
        return match;
    });
}
function loadAttributes(client, workspaceId) {
    return MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesAttributes, {
        workspaceId,
        include: ["labels"],
    })
        .then(MetadataUtilities.mergeEntitiesResults)
        .then(convertAttributesWithSideloadedLabels);
}
function loadAttributeDataset(client, workspace, ref) {
    invariant(isIdentifierRef(ref), "tiger backend only supports referencing by identifier");
    return client.entities
        .getEntityAttributes({
        workspaceId: workspace,
        objectId: ref.identifier,
        include: ["datasets"],
    }, {
        headers: jsonApiHeaders,
    })
        .then((res) => {
        // if this happens then its either bad query parameterization or the backend is hosed badly
        invariant(res.data.included && res.data.included.length > 0, "server returned that attribute does not belong to any dataset");
        const datasets = res.data.included.filter((include) => {
            return include.type === JsonApiDatasetOutWithLinksTypeEnum.DATASET;
        });
        return convertDatasetWithLinks(datasets[0]);
    });
}
function getAllEntitiesAttributesWithFilter(client, workspaceId, ref, includes) {
    invariant(isIdentifierRef(ref), "tiger backend only supports referencing by identifier");
    return client.entities.getAllEntitiesAttributes({
        workspaceId,
        // to be able to get the defaultView value, we need to load the attribute itself and then find the appropriate label inside it
        // otherwise, we would have to load the label first and then load its attribute to see the defaultView relation thus needing
        // an extra network request
        // tiger RSQL does not support prefixed ids, so we strip the prefix to load matches with or without prefix
        // and then find the prefixed value in the results
        filter: `labels.id==${getIdOrigin(ref.identifier).id}`,
        include: includes,
    }, {
        headers: jsonApiHeaders,
    });
}
//# sourceMappingURL=index.js.map