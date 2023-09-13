import { VisualizationProperties } from "@gooddata/sdk-model";
import { IReferenceItems } from "@gooddata/api-model-bear";
/**
 * @internal
 */
export type IdGenerator = () => string;
/**
 * @internal
 */
export interface IConversionData {
    properties: VisualizationProperties;
    references: IReferenceItems;
}
/**
 * @internal
 */
export type ReferenceConverter = (conversionData: IConversionData, idGenerator?: IdGenerator) => IConversionData;
/**
 * Converts URIs to reference based values
 *
 * @param conversionData - Data to convert
 * @param idGenerator - Function that returns unique ids, defaults to uuid
 *
 * @internal
 */
export declare const convertReferencesToUris: ReferenceConverter;
/**
 * Converts URIs to reference based values
 *
 * @param conversionData - Data to convert
 * @param idGenerator - Function that returns unique ids, defaults to uuid
 * @internal
 */
export declare const convertUrisToReferences: ReferenceConverter;
//# sourceMappingURL=ReferenceConverter.d.ts.map