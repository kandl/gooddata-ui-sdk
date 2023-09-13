import React from "react";
import { IPushpinCategoryLegendItem, ItemBorderRadiusPredicate } from "../types.js";
export interface IRowLegendIcoButton {
    isVisible: boolean;
    isActive: boolean;
    onIconClick: () => void;
}
export declare const RowLegendIcoButton: React.FC<IRowLegendIcoButton>;
export interface IRowLegendProps {
    legendLabel?: string;
    maxRowsCount?: number;
    series: IPushpinCategoryLegendItem[];
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    onDialogIconClick: () => void;
    onLegendItemClick: (item: IPushpinCategoryLegendItem) => void;
    isActive?: boolean;
}
export declare const RowLegend: React.FC<IRowLegendProps>;
//# sourceMappingURL=RowLegend.d.ts.map