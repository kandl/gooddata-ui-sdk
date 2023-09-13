import { IDateFilterConfig } from "@gooddata/sdk-model";
import { IDateFilterOptionsByType } from "@gooddata/sdk-ui-filters";
/**
 * Converts date filter config - as stored on the backend - into the date filter options that are aimed for
 * consumption by the actual date filtering view components.
 *
 * @param config - date filter config from backend
 */
export declare function convertDateFilterConfigToDateFilterOptions(config: IDateFilterConfig): IDateFilterOptionsByType;
