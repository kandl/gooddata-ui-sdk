// (C) 2019-2022 GoodData Corporation
import { idRef, } from "@gooddata/sdk-model";
import { toSdkGranularity } from "./dateGranularityConversions.js";
import { newAttributeDisplayFormMetadataObject, newCatalogAttribute, newCatalogDateAttribute, newCatalogDateDataset, newCatalogFact, newCatalogMeasure, } from "@gooddata/sdk-backend-base";
import { commonMetadataObjectModifications } from "./MetadataConverter.js";
import { isInheritedObject } from "./ObjectInheritance.js";
import { convertLabelType } from "./LabelTypeConverter.js";
import { convertUserIdentifier } from "./UsersConverter.js";
const commonGroupableCatalogItemModifications = (item) => (builder) => {
    var _a;
    const tags = (((_a = item.attributes) === null || _a === void 0 ? void 0 : _a.tags) || []).map((tag) => idRef(tag, "tag"));
    return builder.groups(tags);
};
const tigerLabelToDisplayFormMd = (label, attributeRef) => {
    return newAttributeDisplayFormMetadataObject(idRef(label.id, "displayForm"), (builder) => {
        var _a;
        const labelBuilder = commonMetadataObjectModifications(label)(builder);
        labelBuilder.displayFormType(convertLabelType((_a = label.attributes) === null || _a === void 0 ? void 0 : _a.valueType));
        labelBuilder.attribute(attributeRef);
        return labelBuilder;
    });
};
export const convertAttribute = (attribute, defaultLabel, geoLabels, allLabels) => {
    const attributeRef = idRef(attribute.id, "attribute");
    const geoPinDisplayForms = geoLabels.map((df) => tigerLabelToDisplayFormMd(df, attributeRef));
    const displayForms = allLabels.map((df) => tigerLabelToDisplayFormMd(df, attributeRef));
    const defaultDisplayForm = displayForms.find((df) => df.id === defaultLabel.id);
    return newCatalogAttribute((catalogA) => catalogA
        .attribute(attributeRef, (a) => a.modify(commonMetadataObjectModifications(attribute)).displayForms(displayForms))
        .defaultDisplayForm(defaultDisplayForm)
        .geoPinDisplayForms(geoPinDisplayForms)
        .displayForms(displayForms)
        .modify(commonGroupableCatalogItemModifications(attribute)));
};
export const convertMeasure = (measure, included = []) => {
    var _a;
    const { maql = "", format = "" } = ((_a = measure.attributes) === null || _a === void 0 ? void 0 : _a.content) || {};
    return newCatalogMeasure((catalogM) => catalogM
        .measure(idRef(measure.id, "measure"), (m) => {
        var _a, _b, _c, _d;
        return m
            .modify(commonMetadataObjectModifications(measure))
            .expression(maql)
            .format(format)
            .isLocked(isInheritedObject(measure))
            .created((_a = measure.attributes) === null || _a === void 0 ? void 0 : _a.createdAt)
            .createdBy(convertUserIdentifier((_b = measure.relationships) === null || _b === void 0 ? void 0 : _b.createdBy, included))
            .updated((_c = measure.attributes) === null || _c === void 0 ? void 0 : _c.modifiedAt)
            .updatedBy(convertUserIdentifier((_d = measure.relationships) === null || _d === void 0 ? void 0 : _d.modifiedBy, included));
    })
        .modify(commonGroupableCatalogItemModifications(measure)));
};
export const convertFact = (fact) => {
    return newCatalogFact((catalogF) => catalogF
        .fact(idRef(fact.id, "fact"), (f) => f.modify(commonMetadataObjectModifications(fact)))
        .modify(commonGroupableCatalogItemModifications(fact)));
};
export const convertDateAttribute = (attribute, label, allLabels) => {
    const attributeRef = idRef(attribute.id, "attribute");
    const displayForms = allLabels.map((df) => tigerLabelToDisplayFormMd(df, attributeRef));
    const defaultDisplayForm = displayForms.find((df) => df.id === label.id);
    return newCatalogDateAttribute((dateAttribute) => {
        return dateAttribute
            .granularity(toSdkGranularity(attribute.attributes.granularity))
            .attribute(idRef(attribute.id, "attribute"), (a) => a.modify(commonMetadataObjectModifications(attribute)).displayForms(displayForms))
            .defaultDisplayForm(defaultDisplayForm);
    });
};
export const convertDateDataset = (dataset, attributes) => {
    return newCatalogDateDataset((dateDataset) => {
        return dateDataset
            .relevance(0)
            .dataSet(idRef(dataset.id, "dataSet"), (m) => {
            var _a, _b;
            return m
                .id(dataset.id)
                .title(((_a = dataset.attributes) === null || _a === void 0 ? void 0 : _a.title) || "")
                .description(((_b = dataset.attributes) === null || _b === void 0 ? void 0 : _b.description) || "")
                .uri(dataset.links.self)
                .production(true)
                .unlisted(false);
        })
            .dateAttributes(attributes);
    });
};
//# sourceMappingURL=CatalogConverter.js.map