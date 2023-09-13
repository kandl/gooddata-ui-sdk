import React from "react";
import { ButtonsOrientationType } from "./Paging.js";
import { IPushpinCategoryLegendItem, ItemBorderRadiusPredicate } from "./types.js";
/**
 * @internal
 */
export interface IStaticLegendProps {
    containerHeight: number;
    position: string;
    series: IPushpinCategoryLegendItem[];
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    shouldFillAvailableSpace?: boolean;
    label?: string;
    buttonOrientation?: ButtonsOrientationType;
    onItemClick?(item: IPushpinCategoryLegendItem): void;
    paginationHeight?: number;
    customComponent?: JSX.Element | null;
    onPageChanged?: (page: number) => void;
}
/**
 * @internal
 */
export declare class StaticLegend extends React.PureComponent<IStaticLegendProps> {
    static defaultProps: Pick<IStaticLegendProps, "buttonOrientation" | "paginationHeight" | "onPageChanged">;
    state: {
        page: number;
    };
    showNextPage: () => void;
    showPrevPage: () => void;
    renderPaging: (pagesCount: number) => React.ReactNode;
    render(): JSX.Element;
    private getPagesCount;
    private hasCustomComponent;
}
export declare const getPagingValues: (page: number, visibleItemsCount: number, seriesLength: number, hasCustomComponent: boolean) => [number, number];
//# sourceMappingURL=StaticLegend.d.ts.map