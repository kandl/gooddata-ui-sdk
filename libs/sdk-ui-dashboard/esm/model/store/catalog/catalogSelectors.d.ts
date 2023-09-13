import { IAttributeDisplayFormMetadataObject, ICatalogAttribute, ICatalogAttributeHierarchy, ICatalogDateAttribute, ICatalogDateDataset, ICatalogFact, ICatalogMeasure, ObjRef } from "@gooddata/sdk-model";
import { CatalogDateAttributeWithDataset } from "../../../_staging/catalog/dateAttributeWithDatasetMap.js";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
import { DashboardSelector } from "../types.js";
/**
 * @public
 */
export declare const selectCatalogAttributes: DashboardSelector<ICatalogAttribute[]>;
/**
 * @alpha
 */
export declare const selectHasCatalogAttributes: DashboardSelector<boolean>;
/**
 * @public
 */
export declare const selectCatalogAttributeDisplayForms: DashboardSelector<IAttributeDisplayFormMetadataObject[]>;
/**
 * @public
 */
export declare const selectCatalogMeasures: DashboardSelector<ICatalogMeasure[]>;
/**
 * @alpha
 */
export declare const selectHasCatalogMeasures: DashboardSelector<boolean>;
/**
 * @public
 */
export declare const selectCatalogFacts: DashboardSelector<ICatalogFact[]>;
/**
 * @alpha
 */
export declare const selectHasCatalogFacts: DashboardSelector<boolean>;
/**
 * @public
 */
export declare const selectCatalogDateDatasets: DashboardSelector<ICatalogDateDataset[]>;
/**
 * @alpha
 */
export declare const selectHasCatalogDateDatasets: DashboardSelector<boolean>;
/**
 * @public
 */
export declare const selectCatalogDateAttributes: DashboardSelector<ICatalogDateAttribute[]>;
/**
 * @beta
 */
export declare const selectCatalogAttributeHierarchies: DashboardSelector<ICatalogAttributeHierarchy[]>;
/**
 * @alpha
 */
export declare const selectAttributesWithDrillDown: DashboardSelector<(ICatalogAttribute | ICatalogDateAttribute)[]>;
/**
 * Returns map of catalog attribute keys with all their descendants based on attribute hierarchies.
 *
 * This selector does descendant lookup for each existing catalog attribute. If an attribute is in any attribute hierarchy
 * and has at least one descendant, the attribute key is added to the map together with the descendant reference.
 *
 * @beta
 */
export declare const selectAttributesWithHierarchyDescendants: DashboardSelector<Record<string, ObjRef[]>>;
/**
 * @internal
 */
export declare const selectAttributesWithDisplayFormLink: DashboardSelector<ICatalogAttribute[]>;
/**
 * Selects all date datasets in the catalog as a mapping of obj ref to date dataset.
 *
 * @alpha
 */
export declare const selectAllCatalogDateDatasetsMap: DashboardSelector<ObjRefMap<ICatalogDateDataset>>;
/**
 * Selects all display forms in the catalog as a mapping of obj ref to display form
 *
 * @alpha
 */
export declare const selectAllCatalogDisplayFormsMap: DashboardSelector<ObjRefMap<IAttributeDisplayFormMetadataObject>>;
/**
 * Selects all attributes in the catalog as a mapping of ref to catalog's attribute object. The mapping
 * will include both 'normal' attributes and attributes from date datasets.
 *
 * @remarks see `isCatalogAttribute` guard; this can be used to determine type of attribute
 * @alpha
 */
export declare const selectAllCatalogAttributesMap: DashboardSelector<ObjRefMap<ICatalogAttribute | ICatalogDateAttribute>>;
/**
 * Selects all measures in the catalog as a mapping of ref to catalog's measure object.
 *
 * @alpha
 */
export declare const selectAllCatalogMeasuresMap: DashboardSelector<ObjRefMap<ICatalogMeasure>>;
/**
 * Selects lookup mapping between date dataset attributes and date datasets. The entry in lookup contains both the date dataset attribute
 * and the date dataset to which it belongs. The lookup is indexed by the date dataset attribute and entries can be obtained using
 * attribute refs.
 *
 * @alpha
 */
export declare const selectCatalogDateAttributeToDataset: DashboardSelector<ObjRefMap<CatalogDateAttributeWithDataset>>;
