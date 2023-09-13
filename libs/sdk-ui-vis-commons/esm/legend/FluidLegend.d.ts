import React from "react";
import { IPushpinCategoryLegendItem, ItemBorderRadiusPredicate } from "./types.js";
/**
 * @internal
 */
export interface IFluidLegendProps {
    containerWidth: number;
    series: IPushpinCategoryLegendItem[];
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    onItemClick?(item: IPushpinCategoryLegendItem): void;
}
/**
 * @internal
 */
export declare class FluidLegend extends React.PureComponent<IFluidLegendProps> {
    state: {
        showAll: boolean;
    };
    toggleShowAll: () => void;
    renderSeries: (itemWidth: number, visibleItemsCount: number) => React.ReactNode;
    renderPaging: () => React.ReactNode;
    render(): JSX.Element;
}
//# sourceMappingURL=FluidLegend.d.ts.map