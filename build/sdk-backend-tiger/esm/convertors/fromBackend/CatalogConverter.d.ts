import { ICatalogAttribute, ICatalogFact, ICatalogMeasure, ICatalogDateDataset, ICatalogDateAttribute } from "@gooddata/sdk-model";
import { JsonApiAttributeOutWithLinks, JsonApiDatasetOutWithLinks, JsonApiFactOutWithLinks, JsonApiLabelOutWithLinks, JsonApiMetricOutWithLinks, JsonApiMetricOutIncludes } from "@gooddata/api-client-tiger";
export declare const convertAttribute: (attribute: JsonApiAttributeOutWithLinks, defaultLabel: JsonApiLabelOutWithLinks, geoLabels: JsonApiLabelOutWithLinks[], allLabels: JsonApiLabelOutWithLinks[]) => ICatalogAttribute;
export declare const convertMeasure: (measure: JsonApiMetricOutWithLinks, included?: JsonApiMetricOutIncludes[]) => ICatalogMeasure;
export declare const convertFact: (fact: JsonApiFactOutWithLinks) => ICatalogFact;
export declare const convertDateAttribute: (attribute: JsonApiAttributeOutWithLinks, label: JsonApiLabelOutWithLinks, allLabels: JsonApiLabelOutWithLinks[]) => ICatalogDateAttribute;
export declare const convertDateDataset: (dataset: JsonApiDatasetOutWithLinks, attributes: ICatalogDateAttribute[]) => ICatalogDateDataset;
//# sourceMappingURL=CatalogConverter.d.ts.map