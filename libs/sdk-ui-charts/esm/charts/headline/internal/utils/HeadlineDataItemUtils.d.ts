import { RefObject } from "react";
import { IChartConfig } from "../../../../interfaces/index.js";
import { IFormattedHeadlineDataItem, IHeadlineDataItem } from "../interfaces/Headlines.js";
/**
 * Format {@link IHeadlineDataItem} value.
 *
 * The method processes the provided item and returns object with value that can be rendered as it is and 'cssStyle'
 * object that can be passed into the react element 'style' attribute.
 */
export declare function formatItemValue(item: IHeadlineDataItem, config?: IChartConfig): IFormattedHeadlineDataItem;
/**
 * The method processes the provided IHeadlineDataItem and returns object with formatted value and isValueEmpty flag.
 *
 * Formatted value conditions:
 *  - value is rounded to Integer
 *  - shows `>999%` when value is above the limit
 *  - shows `<-999%` when value is below the limit
 *  - otherwise shows 'value%'
 */
export declare function formatPercentageValue(item: IHeadlineDataItem): IFormattedHeadlineDataItem;
export declare function getDrillableClasses(isDrillable: boolean): string[];
export declare function getCompareSectionClasses(clientWidth: number, secondaryItemTitleWrapperRef: RefObject<HTMLDivElement>): string;
//# sourceMappingURL=HeadlineDataItemUtils.d.ts.map