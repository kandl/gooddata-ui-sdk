import { CatalogItemType, CatalogItem, ICatalogGroup, ICatalogAttribute, ICatalogFact, ICatalogMeasure, ICatalogDateDataset } from "@gooddata/sdk-model";
import { CatalogItemType as BearCatalogItemType, ICatalogAttribute as IBearCatalogAttribute, ICatalogMetric as IBearCatalogMetric, ICatalogFact as IBearCatalogFact, ICatalogGroup as IBearCatalogGroup, IWrappedFact, IWrappedAttribute, IWrappedMetric, IDateDataSet } from "@gooddata/api-model-bear";
import { IDisplayFormByKey, IAttributeByKey } from "../../types/catalog.js";
export type CompatibleCatalogItemType = Exclude<CatalogItemType, "dateDataset" | "attributeHierarchy">;
export type CompatibleCatalogItem = Exclude<CatalogItem, ICatalogDateDataset>;
export declare const isCompatibleCatalogItemType: (type: CatalogItemType) => type is CompatibleCatalogItemType;
export declare const convertItemType: (type: CompatibleCatalogItemType) => BearCatalogItemType;
export declare const convertAttribute: (attribute: IBearCatalogAttribute, displayForms: IDisplayFormByKey, attributes: IAttributeByKey) => ICatalogAttribute;
export declare const convertMeasure: (metric: IBearCatalogMetric) => ICatalogMeasure;
export declare const convertFact: (fact: IBearCatalogFact) => ICatalogFact;
export declare const convertDateDataset: (dateDataset: IDateDataSet, attributeById: IAttributeByKey) => ICatalogDateDataset;
export declare const convertWrappedFact: (fact: IWrappedFact) => ICatalogFact;
export declare const convertWrappedAttribute: (attribute: IWrappedAttribute) => ICatalogAttribute;
export declare const convertMetric: (metric: IWrappedMetric) => ICatalogMeasure;
export declare const convertGroup: (group: IBearCatalogGroup) => ICatalogGroup;
//# sourceMappingURL=CatalogConverter.d.ts.map