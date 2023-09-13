import { JsonApiAnalyticalDashboardOutWithLinks, JsonApiAttributeOutDocument, JsonApiAttributeOutList, JsonApiAttributeOutWithLinks, JsonApiDatasetOutWithLinks, JsonApiFactOutWithLinks, JsonApiLabelOutWithLinks, JsonApiMetricOutWithLinks } from "@gooddata/api-client-tiger";
import { IMetadataObjectBuilder } from "@gooddata/sdk-backend-base";
import { IAttributeMetadataObject, IDataSetMetadataObject, IDashboardMetadataObject } from "@gooddata/sdk-model";
export type MetadataObjectFromApi = JsonApiAttributeOutWithLinks | JsonApiFactOutWithLinks | JsonApiMetricOutWithLinks | JsonApiLabelOutWithLinks | JsonApiDatasetOutWithLinks | JsonApiAnalyticalDashboardOutWithLinks;
export declare const commonMetadataObjectModifications: <TItem extends MetadataObjectFromApi, T extends IMetadataObjectBuilder<import("@gooddata/sdk-model").IMetadataObject>>(item: TItem) => (builder: T) => T;
/**
 * Converts result of a single attribute query with included labels into a {@link IAttributeMetadataObject}.
 *
 * @param attribute - response from backend
 */
export declare function convertAttributeWithSideloadedLabels(attribute: JsonApiAttributeOutDocument): IAttributeMetadataObject;
/**
 * Converts result of attributes query with included labels into list of {@link IAttributeMetadataObject}s
 *
 * @param attributes - response from backend
 */
export declare function convertAttributesWithSideloadedLabels(attributes: JsonApiAttributeOutList): IAttributeMetadataObject[];
/**
 * Converts sideloaded dataset into {@link IDataSetMetadataObject}
 *
 * @param dataset - sideloaded dataset
 */
export declare function convertDatasetWithLinks(dataset: JsonApiDatasetOutWithLinks): IDataSetMetadataObject;
/**
 * Converts sideloaded dashboard into {@link IDashboardMetadataObject}
 *
 * @param dashboard - sideloaded dashboard
 */
export declare function convertAnalyticalDashboardWithLinks(dashboard: JsonApiAnalyticalDashboardOutWithLinks): IDashboardMetadataObject;
//# sourceMappingURL=MetadataConverter.d.ts.map