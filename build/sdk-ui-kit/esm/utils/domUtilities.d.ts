import { IRegion } from "../typings/domUtilities.js";
/**
 * Removes the element specified from the DOM
 */
export declare const removeFromDom: (element: HTMLElement) => void;
/**
 * Returns bounding rectangle of specified elements
 * in local (relative to offset parent of element)
 * coordinate space
 *
 * @param element - element to get the region for
 * @param ignoreScrollOffsets - whether to ignore scrollOffsets
 * @param windowObject - use for unit test only
 * @returns Bounding rectangle
 */
export declare const region: (element: HTMLElement, ignoreScrollOffsets?: boolean, windowObject?: Window & typeof globalThis) => IRegion;
/**
 * Returns a value indicating whether the element
 * specified is fixed position
 * or is contained in fixed position element
 */
export declare const isFixedPosition: (element: HTMLElement | string) => boolean;
/**
 * Returns bounding rectangle of specified elements
 * in local (relative to offset parent of element)
 * coordinate space
 */
export declare const elementRegion: (elementOrSelector: HTMLElement | string, getRegionBasedOnPosition?: boolean) => IRegion;
//# sourceMappingURL=domUtilities.d.ts.map