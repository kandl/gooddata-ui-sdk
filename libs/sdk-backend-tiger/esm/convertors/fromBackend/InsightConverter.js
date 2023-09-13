import { idRef } from "@gooddata/sdk-model";
import { isInheritedObject } from "./ObjectInheritance.js";
import { convertVisualizationObject } from "./visualizationObjects/VisualizationObjectConverter.js";
import { convertUserIdentifier } from "./UsersConverter.js";
export const insightFromInsightDefinition = (insight, id, uri, tags, isLocked, created, updated, createdBy, updatedBy) => {
    return {
        insight: Object.assign(Object.assign({}, insight.insight), { identifier: id, uri, ref: idRef(id, "insight"), isLocked,
            tags,
            created,
            createdBy,
            updated,
            updatedBy }),
    };
};
export const visualizationObjectsItemToInsight = (visualizationObject, included = []) => {
    const { id, attributes, links, relationships = {} } = visualizationObject;
    const { createdBy, modifiedBy } = relationships;
    const { content, title, description, tags, createdAt, modifiedAt } = attributes;
    return insightFromInsightDefinition(convertVisualizationObject(content, title, description, tags), id, links.self, tags, 
    // TODO: TIGER-HACK: inherited objects must be locked; they are read-only for all
    isInheritedObject(visualizationObject), createdAt, modifiedAt, convertUserIdentifier(createdBy, included), convertUserIdentifier(modifiedBy, included));
};
//# sourceMappingURL=InsightConverter.js.map