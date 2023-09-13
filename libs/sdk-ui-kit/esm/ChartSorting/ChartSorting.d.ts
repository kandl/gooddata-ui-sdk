import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISortItem } from "@gooddata/sdk-model";
import { IBucketItemDescriptors, IAvailableSortsGroup } from "./types.js";
/**
 * @internal
 */
export interface ChartSortingOwnProps {
    currentSort: ISortItem[];
    availableSorts: IAvailableSortsGroup[];
    bucketItems: IBucketItemDescriptors;
    onApply: (sortItems: ISortItem[]) => void;
    onCancel: () => void;
    buttonNode?: HTMLElement | string;
    locale?: string;
    enableRenamingMeasureToMetric?: boolean;
}
/**
 * @internal
 */
export type ChartSortingProps = ChartSortingOwnProps & WrappedComponentProps;
/**
 * @internal
 */
export declare const ChartSorting: React.FC<ChartSortingProps>;
/**
 * @internal
 */
export declare const ChartSortingWithIntl: React.FC<import("react-intl").WithIntlProps<ChartSortingProps>> & {
    WrappedComponent: React.ComponentType<ChartSortingProps>;
};
/**
 * @internal
 */
export declare const ChartSortingDialog: React.FC<ChartSortingOwnProps>;
//# sourceMappingURL=ChartSorting.d.ts.map