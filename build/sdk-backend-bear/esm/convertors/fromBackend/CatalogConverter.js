// (C) 2019-2023 GoodData Corporation
import { uriRef, idRef, } from "@gooddata/sdk-model";
import { newAttributeDisplayFormMetadataObject, newCatalogAttribute, newCatalogDateAttribute, newCatalogDateDataset, newCatalogFact, newCatalogGroup, newCatalogMeasure, } from "@gooddata/sdk-backend-base";
export const isCompatibleCatalogItemType = (type) => type !== "dateDataset" && type !== "attributeHierarchy";
const bearItemTypeByCatalogItemType = {
    attribute: "attribute",
    fact: "fact",
    measure: "metric",
};
export const convertItemType = (type) => bearItemTypeByCatalogItemType[type];
const bearObjectMetaToBearRef = (obj) => uriRef(obj.uri);
const bearCatalogItemToBearRef = (obj) => uriRef(obj.links.self);
const bearGroupableCatalogItemToTagRefs = (item) => {
    const { groups = [] } = item;
    return groups.map((tagId) => idRef(tagId));
};
const commonMetadataModifications = (item) => (builder) => {
    var _a;
    return builder
        .id(item.identifier)
        .uri(item.uri)
        .title(item.title)
        .description((_a = item.summary) !== null && _a !== void 0 ? _a : "")
        .production(item.isProduction === 1)
        .unlisted(item.unlisted === 1)
        .deprecated(item.deprecated === "1");
};
const commonCatalogItemModifications = (item) => (builder) => builder
    .id(item.identifier)
    .uri(item.links.self)
    .title(item.title)
    .description(item.summary)
    .production(item.production)
    .unlisted(false)
    .deprecated(false);
const convertDisplayForm = (df, attrRef) => {
    const ref = bearObjectMetaToBearRef(df.meta);
    return newAttributeDisplayFormMetadataObject(ref, (m) => {
        return m
            .modify(commonMetadataModifications(df.meta))
            .attribute(attrRef)
            .displayFormType(df.content.type);
    });
};
export const convertAttribute = (attribute, displayForms, attributes) => {
    var _a;
    const attrRef = bearCatalogItemToBearRef(attribute);
    const defaultDisplayForm = displayForms[attribute.links.defaultDisplayForm];
    const attributeData = attributes[attribute.identifier];
    const geoPinDisplayForms = ((_a = attribute.links.geoPinDisplayForms) !== null && _a !== void 0 ? _a : []).map((uri) => displayForms[uri]);
    const attributeDisplayForms = attributeData.attribute.content.displayForms.map((displayForm) => convertDisplayForm(displayForm, attrRef));
    const groups = bearGroupableCatalogItemToTagRefs(attribute);
    const drillDownStep = attributeData.attribute.content.drillDownStepAttributeDF
        ? uriRef(attributeData.attribute.content.drillDownStepAttributeDF)
        : undefined;
    const drillDownLink = attributeData.attribute.content.linkAttributeDF
        ? uriRef(attributeData.attribute.content.linkAttributeDF)
        : undefined;
    return newCatalogAttribute((catalogA) => catalogA
        .attribute(attrRef, (a) => {
        return a
            .modify(commonCatalogItemModifications(attribute))
            .drillDownStep(drillDownStep)
            .drillToAttributeLink(drillDownLink)
            .displayForms(attributeDisplayForms);
    })
        .defaultDisplayForm(convertDisplayForm(defaultDisplayForm, attrRef))
        .displayForms(attributeDisplayForms)
        .geoPinDisplayForms(geoPinDisplayForms.map((df) => convertDisplayForm(df, attrRef)))
        .groups(groups));
};
export const convertMeasure = (metric) => {
    const measureRef = bearCatalogItemToBearRef(metric);
    const groups = bearGroupableCatalogItemToTagRefs(metric);
    return newCatalogMeasure((catalogM) => catalogM
        .measure(measureRef, (m) => m
        .modify(commonCatalogItemModifications(metric))
        .expression(metric.expression)
        .format(metric.format))
        .groups(groups));
};
export const convertFact = (fact) => {
    const factRef = bearCatalogItemToBearRef(fact);
    const groups = bearGroupableCatalogItemToTagRefs(fact);
    return newCatalogFact((catalogF) => catalogF.fact(factRef, (f) => f.modify(commonCatalogItemModifications(fact))).groups(groups));
};
const convertDateDataSetAttribute = (dateDatasetAttribute, attributeById) => {
    const { attributeMeta, defaultDisplayFormMeta } = dateDatasetAttribute;
    const attributeRef = bearObjectMetaToBearRef(attributeMeta);
    const displayFormRef = bearObjectMetaToBearRef(defaultDisplayFormMeta);
    const attributeData = attributeById[attributeMeta.identifier];
    const attributeDisplayForms = attributeData.attribute.content.displayForms.map((displayForm) => convertDisplayForm(displayForm, attributeRef));
    const drillDownStep = attributeData.attribute.content.drillDownStepAttributeDF
        ? uriRef(attributeData.attribute.content.drillDownStepAttributeDF)
        : undefined;
    return newCatalogDateAttribute((catalogDa) => catalogDa
        .attribute(attributeRef, (a) => a
        .modify(commonMetadataModifications(attributeMeta))
        .drillDownStep(drillDownStep)
        .displayForms(attributeDisplayForms))
        .defaultDisplayForm(displayFormRef, (df) => df.modify(commonMetadataModifications(defaultDisplayFormMeta)))
        .granularity(dateDatasetAttribute.type));
};
export const convertDateDataset = (dateDataset, attributeById) => {
    const { availableDateAttributes = [] } = dateDataset;
    const dateDatasetRef = bearObjectMetaToBearRef(dateDataset.meta);
    const dateAttributes = availableDateAttributes.map((attribute) => convertDateDataSetAttribute(attribute, attributeById));
    return newCatalogDateDataset((catalogDs) => catalogDs
        .dataSet(dateDatasetRef, (ds) => ds.modify(commonMetadataModifications(dateDataset.meta)))
        .dateAttributes(dateAttributes)
        .relevance(dateDataset.relevance));
};
export const convertWrappedFact = (fact) => {
    const { meta } = fact.fact;
    const factRef = uriRef(meta.uri);
    return newCatalogFact((catalogFact) => catalogFact.fact(factRef, (f) => f.modify(commonMetadataModifications(meta))));
};
export const convertWrappedAttribute = (attribute) => {
    var _a, _b;
    const { content, meta } = attribute.attribute;
    const attrRef = uriRef(meta.uri);
    const displayForms = (_a = content.displayForms) !== null && _a !== void 0 ? _a : [];
    const defaultDisplayForm = (_b = displayForms.find((df) => df.content.default === 1)) !== null && _b !== void 0 ? _b : displayForms[0];
    const geoPinDisplayForms = displayForms.filter((df) => df.content.type === "GDC.geo.pin");
    return newCatalogAttribute((catalogAttr) => {
        let result = catalogAttr
            .attribute(attrRef, (a) => a.modify(commonMetadataModifications(meta)))
            .displayForms(displayForms.map((displayForm) => newAttributeDisplayFormMetadataObject(uriRef(displayForm.meta.uri), (df) => df
            .modify(commonMetadataModifications(displayForm.meta))
            .attribute(attrRef)
            .displayFormType(displayForm.content.type))))
            .geoPinDisplayForms(geoPinDisplayForms.map((geoDisplayForm) => {
            return newAttributeDisplayFormMetadataObject(uriRef(geoDisplayForm.meta.uri), (df) => df
                .modify(commonMetadataModifications(geoDisplayForm.meta))
                .attribute(attrRef)
                .displayFormType(geoDisplayForm.content.type));
        }));
        if (defaultDisplayForm) {
            result = result.defaultDisplayForm(uriRef(defaultDisplayForm.meta.uri), (df) => df
                .modify(commonMetadataModifications(defaultDisplayForm.meta))
                .attribute(attrRef)
                .displayFormType(defaultDisplayForm.content.type));
        }
        return result;
    });
};
export const convertMetric = (metric) => {
    const { content, meta } = metric.metric;
    const measureRef = uriRef(meta.uri);
    return newCatalogMeasure((catalogMeasure) => catalogMeasure.measure(measureRef, (m) => {
        var _a;
        return m
            .modify(commonMetadataModifications(meta))
            .expression(content.expression)
            .format((_a = content.format) !== null && _a !== void 0 ? _a : "#,#.##");
    }));
};
export const convertGroup = (group) => {
    return newCatalogGroup((catalogG) => catalogG.title(group.title).tag(idRef(group.identifier)));
};
//# sourceMappingURL=CatalogConverter.js.map