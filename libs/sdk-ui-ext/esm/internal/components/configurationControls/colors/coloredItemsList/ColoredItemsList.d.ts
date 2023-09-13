import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IColor, IColorPalette } from "@gooddata/sdk-model";
import { IColoredItem } from "../../../../interfaces/Colors.js";
export interface IColoredItemsListOwnProps {
    colorPalette: IColorPalette;
    inputItems: IColoredItem[];
    onSelect: (selectedColorItem: IColoredItem, color: IColor) => void;
    showCustomPicker?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
}
export interface IColoredItemsListState {
    searchString?: string;
}
export type IColoredItemsListProps = IColoredItemsListOwnProps & WrappedComponentProps;
declare const _default: React.FC<import("react-intl").WithIntlProps<IColoredItemsListProps>> & {
    WrappedComponent: React.ComponentType<IColoredItemsListProps>;
};
export default _default;
//# sourceMappingURL=ColoredItemsList.d.ts.map