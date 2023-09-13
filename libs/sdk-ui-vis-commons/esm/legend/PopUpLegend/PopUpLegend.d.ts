import React from "react";
import { IPushpinCategoryLegendItem, ItemBorderRadiusPredicate } from "../types.js";
/**
 * @internal
 */
export interface IPopUpLegendProps {
    series: IPushpinCategoryLegendItem[];
    onLegendItemClick: (item: IPushpinCategoryLegendItem) => void;
    name?: string;
    maxRows?: number;
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    containerId: string;
    customComponent?: JSX.Element | null;
    customComponentName?: string;
}
/**
 * @internal
 */
export declare const PopUpLegend: React.FC<IPopUpLegendProps>;
//# sourceMappingURL=PopUpLegend.d.ts.map