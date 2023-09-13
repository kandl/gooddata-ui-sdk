import { IdentifierRef } from "../objRef/index.js";
/**
 * @internal
 */
export interface IDrillToUrlPlaceholder {
    placeholder: string;
    identifier: string;
    ref: IdentifierRef;
    toBeEncoded: boolean;
}
/**
 * @internal
 */
export type IDrillUrlPart = string | IdentifierRef;
/**
 * @internal
 */
export declare const splitDrillUrlParts: (url: string) => IDrillUrlPart[];
/**
 * @internal
 */
export declare const joinDrillUrlParts: (parts: IDrillUrlPart[] | string) => string;
/**
 * @internal
 */
export declare const getAttributeIdentifiersPlaceholdersFromUrl: (url: string) => IDrillToUrlPlaceholder[];
//# sourceMappingURL=drillUrl.d.ts.map