import { IMeasureDescriptor, IAttributeDescriptor, IResultAttributeHeader, ITotalDescriptor, IResultAttributeHeaderItem, ITotalDescriptorItem, IColorDescriptor, IResultMeasureHeader } from "@gooddata/sdk-model";
/**
 * @privateRemarks
 * TODO: SDK8: remove this, replace with something more meaningful
 *
 * @public
 */
export type IMappingHeader = IAttributeDescriptor | IResultAttributeHeader | IMeasureDescriptor | ITotalDescriptor | IColorDescriptor;
/**
 * @internal
 */
export declare function hasMappingHeaderLocalIdentifier(header: IMappingHeader): boolean;
/**
 * @internal
 */
export declare function hasMappingHeaderFormattedName(header: IMappingHeader): boolean;
/**
 * @internal
 */
export declare function getMappingHeaderLocalIdentifier(header: IMappingHeader): string;
/**
 * @internal
 */
export declare function getMappingHeaderName(header: IMappingHeader | IResultMeasureHeader): string | undefined | null;
/**
 * Get formatted name of provided mapping header.
 *
 * Formatted name has higher priority than name when displaying in visualisations.
 *
 * @internal
 */
export declare function getMappingHeaderFormattedName(header: IMappingHeader | IResultMeasureHeader): string | undefined | null;
/**
 * Get formatted name of provided total header item.
 *
 * @internal
 */
export declare function getTotalHeaderItemName(totalHeaderItem: ITotalDescriptorItem | undefined): string | undefined;
/**
 * Get formatted name of provided attribute header item.
 *
 * Formatted name has higher priority than name when displaying in visualisations.
 *
 * @internal
 */
export declare function getAttributeHeaderItemName(attributeHeaderItem: IResultAttributeHeaderItem | undefined): string | null | undefined;
/**
 * @internal
 */
export declare function getMappingHeaderIdentifier(header: IMappingHeader): string | undefined;
/**
 * @internal
 */
export declare function getMappingHeaderUri(header: IMappingHeader): string | undefined;
//# sourceMappingURL=MappingHeader.d.ts.map