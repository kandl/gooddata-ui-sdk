// (C) 2019-2022 GoodData Corporation
import { isWrappedMetric, unwrapMetadataObject, } from "@gooddata/api-model-bear";
import flow from "lodash/flow.js";
import map from "lodash/fp/map.js";
import replace from "lodash/fp/replace.js";
import uniq from "lodash/fp/uniq.js";
import { convertMetadataObject, } from "../../../convertors/fromBackend/MetaConverter.js";
import { convertListedMetric, convertMetricFromBackend, } from "../../../convertors/fromBackend/MetricConverter.js";
import { convertMetricToBackend } from "../../../convertors/toBackend/MetricConverter.js";
import { objRefToUri } from "../../../utils/api.js";
import { getTokenValuesOfType, tokenizeExpression } from "./measureExpressionTokens.js";
import { convertListedVisualization } from "../../../convertors/fromBackend/VisualizationConverter.js";
export class BearWorkspaceMeasures {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async getMeasureExpressionTokens(ref) {
        const uri = await objRefToUri(ref, this.workspace, this.authCall);
        const metricMetadata = await this.authCall((sdk) => sdk.xhr.getParsed(uri));
        if (!isWrappedMetric(metricMetadata)) {
            throw new Error("To get measure expression tokens, provide the correct measure identifier. Did you provide a measure identifier?");
        }
        const expressionTokens = tokenizeExpression(metricMetadata.metric.content.expression);
        const expressionIdentifiers = getTokenValuesOfType("identifier", expressionTokens);
        const expressionUris = getTokenValuesOfType("uri", expressionTokens);
        const expressionElementUris = getTokenValuesOfType("element_uri", expressionTokens);
        const expressionIdentifierUrisPairs = await this.authCall((sdk) => sdk.md.getUrisFromIdentifiers(this.workspace, expressionIdentifiers));
        const expressionIdentifierUris = expressionIdentifierUrisPairs.map((pair) => pair.uri);
        const allExpressionElementAttributeUris = flow(map(replace(/\/elements\?id=.*/, "")), uniq)(expressionElementUris);
        const allExpressionUris = uniq([
            ...expressionUris,
            ...expressionIdentifierUris,
            ...allExpressionElementAttributeUris,
        ]);
        const allExpressionWrappedObjects = await this.authCall((sdk) => sdk.md.getObjects(this.workspace, allExpressionUris));
        const allExpressionObjects = allExpressionWrappedObjects.map(unwrapMetadataObject);
        const allExpressionAttributeElements = await Promise.all(expressionElementUris.map((elementUri) => this.authCall((sdk) => sdk.md.getAttributeElementDefaultDisplayFormValue(elementUri))));
        const objectsByUri = allExpressionObjects.reduce((acc, el) => {
            acc[el.meta.uri] = el;
            return acc;
        }, {});
        const objectsByIdentifier = allExpressionObjects.reduce((acc, el) => {
            acc[el.meta.identifier] = el;
            return acc;
        }, {});
        const attributeElementsByUri = allExpressionAttributeElements.reduce((acc, el) => {
            if (el) {
                acc[el.uri] = el;
            }
            return acc;
        }, {});
        return expressionTokens.map((token) => {
            if (token.type === "element_uri") {
                return createAttribute(attributeElementsByUri, token);
            }
            if (token.type === "uri" || token.type === "identifier") {
                return createIdentifier(token, objectsByUri, objectsByIdentifier);
            }
            if (token.type === "comment" ||
                token.type === "number" ||
                token.type === "quoted_text" ||
                token.type === "text" ||
                token.type === "bracket") {
                return createToken(token.type, token.value);
            }
            return createToken("text", token.value);
        });
    }
    async createMeasure(measure) {
        const mdObject = await this.authCall((sdk) => sdk.md.createObject(this.workspace, { metric: convertMetricToBackend(measure) }));
        return convertMetricFromBackend(mdObject.metric);
    }
    async deleteMeasure(ref) {
        const uri = await objRefToUri(ref, this.workspace, this.authCall);
        await this.authCall((sdk) => sdk.md.deleteObject(uri));
    }
    async updateMeasure(measure) {
        const objectId = measure.uri.split("/").slice(-1)[0];
        await this.authCall((sdk) => {
            return sdk.md.updateObject(this.workspace, objectId, { metric: convertMetricToBackend(measure) });
        });
        return measure;
    }
    async getMeasureReferencingObjects(ref) {
        const uri = await objRefToUri(ref, this.workspace, this.authCall);
        const data = await this.authCall((sdk) => sdk.md.getObjectUsedBy(this.workspace, uri, {
            types: ["metric", "visualizationObject"],
            nearest: true,
        }));
        return Promise.resolve({
            measures: data.filter((item) => item.category === "metric").map(convertListedMetric),
            insights: data
                .filter((item) => item.category === "visualizationObject")
                .map(convertListedVisualization),
        });
    }
}
function createAttribute(attributeElementsByUri, token) {
    const element = attributeElementsByUri[token.value];
    return Object.assign({ type: "attributeElement" }, (element
        ? {
            value: element.title,
        }
        : {
            value: "",
            deleted: true,
        }));
}
function createIdentifier(token, objectsByUri, objectsByIdentifier) {
    const meta = token.type === "uri"
        ? convertMetadataObject(objectsByUri[token.value])
        : convertMetadataObject(objectsByIdentifier[token.value]);
    return {
        type: meta.type,
        value: meta.title,
        id: meta.id,
        ref: meta.ref,
    };
}
function createToken(type, value) {
    return {
        type,
        value,
    };
}
//# sourceMappingURL=index.js.map