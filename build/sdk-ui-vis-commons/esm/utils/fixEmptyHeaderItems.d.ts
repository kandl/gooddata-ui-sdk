import { IDataView } from "@gooddata/sdk-backend-spi";
/**
 * This function will mutate the incoming data view and replace headers with empty name with a fallback
 * string. This is so that we can show "(empty)" or similar strings in the UI.
 *
 * @param dataView - view to mutate
 * @param emptyHeaderString - value to use for empty strings
 * @deprecated try to avoid using this function and handle empty headers when displaying them
 * @public
 */
export declare function fixEmptyHeaderItems(dataView: IDataView, emptyHeaderString: string): void;
//# sourceMappingURL=fixEmptyHeaderItems.d.ts.map